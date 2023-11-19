/* eslint-disable no-undef */
import { defineConfig } from 'tsup';

import * as path from 'path';
import * as fs from 'fs';

const OUT_DIR = path.resolve(__dirname, 'lib');

export default defineConfig(async () => ({
    outDir: OUT_DIR,
    entry: { index: 'src/index.ts', ...(await getGuardsEntries()) },
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

async function getGuardsEntries() {
    const guardSrcFiles = await fs.promises.readdir(path.resolve(__dirname, 'src/guards'));
    return guardSrcFiles.reduce((acc, name) => {
        acc[name.split('.')[0]] = `src/guards/${name}`;
        return acc;
    }, {} as Record<string, string>);
}
