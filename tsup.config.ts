/* eslint-disable no-undef */
import { defineConfig } from 'tsup';

import * as path from 'path';
import * as fs from 'fs';

const OUT_DIR = path.resolve(__dirname, 'lib');
const SRC_DIR = path.resolve(__dirname, 'src');
const GUARDS_SRC_DIR = path.resolve(SRC_DIR, 'guards');

export default defineConfig(async () => ({
    outDir: OUT_DIR,
    entry: { index: 'src/index.ts', ...createStandaloneEntryMap(GUARDS_SRC_DIR) },
    format: ['cjs', 'esm'],
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    platform: 'neutral',
    target: 'es5',
    minify: true,
    dts: true,
}));

/**
 * Create a mapping between standalone entry name and path to the file.
 */
function createStandaloneEntryMap(pathToDir: string): Record<string, string> {
    return fs.readdirSync(pathToDir).reduce((acc, name) => {
        acc[name.split('.')[0]] = `src/guards/${name}`;
        return acc;
    }, {});
}
