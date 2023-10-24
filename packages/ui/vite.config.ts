import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'suiUi',
      fileName: 'sui-ui',
    },
    rollupOptions: {
      external: [/lodash.*/, 'vue'],
      output: {
        globals: {
          lodash: 'lodash',
        },
      },
    },
    minify: false,
  },
});
