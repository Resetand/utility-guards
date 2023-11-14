import { defineConfig } from 'tsup';

export default defineConfig({
    outDir: 'dist',
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    splitting: false,
    sourcemap: false,
    clean: true,
    treeshake: true,
    minify: true,
    platform: 'neutral',
    dts: true,
});
