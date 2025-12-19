import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path-browserify'; // install this first: npm install path-browserify

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      path: 'path-browserify', // Redirect Node 'path' imports to browser-compatible version
    },
  },
});
