import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/drag-and-drop-example/',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (info) => {
          // Keep CSS files with a hash in the filename
          if (info.name?.endsWith('.css')) {
            return 'assets/[name].[hash].css';
          }
          // Exclude JPEG and PNG files from dynamic file generation
          if (
            info.name?.endsWith('.jpg')
          || info.name?.endsWith('.jpeg')
          || info.name?.endsWith('.png')
          || info.name?.endsWith('.ico')
          ) {
            return '[name].[ext]';
          }
          // Generate other files with a hash in the filename
          return 'assets/[name].[hash].[ext]';
        },
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.ico']
});
