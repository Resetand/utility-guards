/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const cp = require('child_process');

const { glob } = require('glob');

const TMP_DIR = path.join(os.tmpdir(), `npm-pack-${Date.now()}`);
const PROJECT_ROOT = path.resolve(__dirname, '..');

async function main(buildDirName = 'lib') {
    await copyPackageFilesToTmp();

    const buildFiles = await glob(`${buildDirName}/**/*`, { cwd: '.' });
    await copyToTmp(...buildFiles);

    // run npm pack command
    await exec(`npm pack ${TMP_DIR} --pack-destination ${PROJECT_ROOT}`);
}

/**
 * Copy package files to tmp directory. EG: `package.json`, `README.md`, etc.
 */
async function copyPackageFilesToTmp() {
    const packageFiles = ['package.json', 'README.md', '.npmignore'];
    const filePathsToCopy = await glob(packageFiles, { cwd: '.' });
    await copyToTmp(...filePathsToCopy);

    await exec(`npm pack`);
}

async function copyToTmp(...paths) {
    await fs.mkdir(TMP_DIR, { recursive: true });

    for (const p of paths) {
        const basename = path.basename(p);
        const dest = path.join(TMP_DIR, basename);
        await fs.copyFile(p, dest);
    }
}

/**
 *
 * @param {String} command
 * @returns Promise<{stdout: String, stderr: String}>
 * @throws Error – if the command fails (stderr is not empty)
 */
function exec(command) {
    return new Promise((resolve, reject) => {
        cp.exec(`cd ${PROJECT_ROOT} && ${command}`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve({ stdout, stderr });
        });
    });
}

main();
