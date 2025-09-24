// import mkcert from 'vite-plugin-mkcert';
//
// export default {
//   server: {
//     https: true,
//     host: 'localhost',
//     port: 5173,
//   },
//   plugins: [mkcert()],
// };
//
//







import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // This specifies the output directory for the production build
    sourcemap: false, // This disables source maps for smaller production builds
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
});
