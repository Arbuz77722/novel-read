import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path-browserify';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: true,
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      path: 'path-browserify',
    },
  },
});
