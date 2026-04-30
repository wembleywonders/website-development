import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react()
      // Note: Console removal is handled by Terser in build.terserOptions
      // No need for babel-plugin-transform-remove-console
    ],

    // Path aliases for cleaner imports
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@services': path.resolve(__dirname, './src/services'),
        '@config': path.resolve(__dirname, './src/config'),
        '@data': path.resolve(__dirname, './src/data'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@types': path.resolve(__dirname, './src/types'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@features': path.resolve(__dirname, './src/features'),
        '@systems': path.resolve(__dirname, './src/systems'),
      }
    },

    // Development server configuration
    server: {
      port: 5173,
      host: true,
      strictPort: false,
      open: true,
      cors: true,
      // Proxy API calls to Spring Boot backend on :8080
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        }
      }
    },

    // Build optimizations
    build: {
      outDir: 'dist',
      
      // Source maps - enable for staging, disable for production
      sourcemap: !isProduction,
      
      // Chunk size warning limit (500kb)
      chunkSizeWarningLimit: 500,
      
      // Minification with Terser
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: true,
          pure_funcs: isProduction ? ['console.log', 'console.info', 'console.debug'] : [],
        },
        format: {
          comments: false,
        },
        mangle: {
          safari10: true, // Fix Safari 10 issues
        }
      },

      // Rollup options for advanced bundling
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: (id) => {
            // React core
            if (id.includes('node_modules/react') || 
                id.includes('node_modules/react-dom') ||
                id.includes('node_modules/react-router')) {
              return 'react-vendor';
            }
            
            // Icons
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
            
            // UI libraries (if you add any)
            if (id.includes('node_modules/@radix-ui') ||
                id.includes('node_modules/@headlessui')) {
              return 'ui-vendor';
            }
            
            // Utility libraries
            if (id.includes('node_modules/date-fns') ||
                id.includes('node_modules/lodash') ||
                id.includes('node_modules/clsx')) {
              return 'utils-vendor';
            }
            
            // Firebase (when added)
            if (id.includes('node_modules/firebase') ||
                id.includes('node_modules/@firebase')) {
              return 'firebase';
            }
          },
          
          // Asset file naming - organize by type
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? '';
            const ext = name.split('.').pop()?.toLowerCase() || '';
            
            if (/png|jpe?g|svg|gif|webp|avif|ico/i.test(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            if (/css/i.test(ext)) {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
          
          // Chunk file naming
          chunkFileNames: 'assets/js/[name]-[hash].js',
          
          // Entry file naming
          entryFileNames: 'assets/js/[name]-[hash].js',
        }
      },

      // Inline assets smaller than 4kb as base64
      assetsInlineLimit: 4096,
      
      // CSS code splitting
      cssCodeSplit: true,
      
      // Target modern browsers for smaller bundles
      target: 'es2020',
      
      // Reporting
      reportCompressedSize: true,
      
      // Clean output dir
      emptyOutDir: true,
    },

    // CSS configuration
    css: {
      modules: {
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
      },
      devSourcemap: !isProduction,
    },

    // Optimize dependencies for faster dev startup
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'lucide-react',
      ],
      exclude: []
    },

    // Preview server config (for testing production build locally)
    preview: {
      port: 4173,
      host: true,
      strictPort: false,
      open: true,
      cors: true,
    },

    // JSON imports
    json: {
      stringify: false,
    },

    // esbuild configuration
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      jsx: 'automatic',
      // Drop console in production via esbuild (alternative to terser)
      // drop: isProduction ? ['console', 'debugger'] : [],
    },
  }
})