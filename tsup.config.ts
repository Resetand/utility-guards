 
import { defineConfig } from 'tsup';

import * as path from 'path';
import * as fs from 'fs';

const OUT_DIR = path.resolve(__dirname, 'lib');
const SRC_DIR = path.resolve(__dirname, 'src');

export default defineConfig(async () => {
    const entry = await makeEntryMap(SRC_DIR);

    return {
        entry,
        outDir: OUT_DIR,
        format: ['cjs', 'esm'],
        splitting: false,
        sourcemap: false,
        clean: true,
        treeshake: true,
        platform: 'neutral',
        target: 'es5',
        minify: true,
        dts: { entry },
        bundle: true,
    };
});

/**
 * Make a entry map for tsup.
 * Entry map is a mapping between entry name and path to the file.
 * It will treat all nested files as entry points, except files starting with `_`.
 */
async function makeEntryMap(dirPath: string, aliases?: Record<string, string>) {
    const dir = await fs.promises.opendir(dirPath);
    const entries: Record<string, string> = {};

    for await (const dirent of dir) {
        const isFile = dirent.isFile();
        const isDir = dirent.isDirectory();

        const isTsFile = isFile && dirent.name.endsWith('.ts');
        const isValidEntryFile = !dirent.name.startsWith('_') && (isDir || isTsFile);

        if (!isValidEntryFile) {
            continue;
        }

        if (dirent.isDirectory()) {
            const subDirPath = path.resolve(dirPath, dirent.name);
            Object.assign(entries, await makeEntryMap(subDirPath, aliases));
        }

        if (dirent.isFile()) {
            const name = dirent.name.split('.')[0];
            const alias = aliases?.[name] ?? name;
            const direntPath = path.resolve(dirPath, dirent.name);
            entries[alias] = direntPath;
            continue;
        }
    }

    return entries;
}
