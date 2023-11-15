import { defineConfig } from 'tsup';

export default defineConfig({
    outDir: 'dist',
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    platform: 'neutral',
    target: ['es2015', 'es2019'],
    dts: true,
    minify: true,
});
