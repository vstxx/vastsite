import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'version-entry-script-request',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler(html) {
          const version = Date.now().toString(36)
          return html.replace(
            /(<script\b[^>]*\bsrc=")(\/assets\/[^"]+\.js)("[^>]*><\/script>)/,
            (_match, before, source, after) => `${before}${source}?v=${version}${after}`,
          )
        },
      },
    },
  ],
})
