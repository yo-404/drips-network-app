import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const config = defineConfig({
  plugins: [sveltekit(), nodePolyfills()],
  test: {
    // Jest like globals
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.ts'],
    exclude: ['src/e2e-tests/.tmp/**'],
    setupFiles: ['./setup-test.js'],
    deps: {
      inline: [
        '@ethersproject/signing-key',
        '@ethersproject/basex',
        '@depay/solana-web3.js',
        'cupertino-pane',
      ],
    },
  },
  build: {
    target: 'es2020',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  preview: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      // Required for octokit.
      'node-fetch': 'isomorphic-fetch',
    },
  },
});

export default config;
