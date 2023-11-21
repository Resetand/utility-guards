/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');
const { saveCurrentChanges, restoreCurrentChanges } = require('./_shared');

async function main() {
    try {
        console.log('Saving current changes...');
        await saveCurrentChanges();

        console.log('Running prepack...');

        console.log('Cleaning up current directory for prepack...');
        // cleanup current directory
        await cleanupCurrentDirForPrepack();

        console.log('Unpacking lib/ directory...');
        // unpack lib/ directory
        await unpackLibDir();
    } catch (error) {
        console.log('Rolling back changes after prepack...');
        await restoreCurrentChanges();

        console.error(error);
        process.exit(1);
    }
}

/**
 * Removes all files and directories in the current directory except everything in .gitingore
 * and npm package files.
 * - scripts/
 * - package.json
 * - README.md
 * - .git/
 * - .npmignore
 */
async function cleanupCurrentDirForPrepack() {
    const excludePatterns = ['package.json', 'README.md', '.git', '.npmignore', 'scripts'];

    const gitignoreContent = await fs.readFile('.gitignore', 'utf8');
    const gitignorePatterns = gitignoreContent
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => Boolean(line) && !line.startsWith('#'));

    const excludeFilePaths = await glob.glob([...excludePatterns, ...gitignorePatterns], { cwd: '.' });

    const dir = await fs.opendir('.');

    for await (const dirent of dir) {
        if (!excludeFilePaths.includes(dirent.path)) {
            await fs.rm(dirent.name, { recursive: true, force: true });
        }
    }
}

/**
 * Moves all files from lib/ to the current directory.
 */
async function unpackLibDir() {
    const dir = await fs.opendir('lib');

    for await (const dirent of dir) {
        await fs.rename(path.join('lib', dirent.name), dirent.name);
    }
}

main();
