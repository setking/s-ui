import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'suiUtils',
      fileName: 'sui-utils',
    },
    rollupOptions: {
      external: [/lodash.*/],
      output: {
        globals: {
          lodash: 'lodash',
        },
      },
    },
    minify: false,
  },
});
