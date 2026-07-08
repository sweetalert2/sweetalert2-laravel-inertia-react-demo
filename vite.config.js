import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import inertia from '@inertiajs/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
    inertia(),
    tailwindcss(),
  ],
  esbuild: {
    jsx: 'automatic',
  },
  server: {
    watch: {
      ignored: ['**/storage/framework/views/**'],
    },
  },
})
