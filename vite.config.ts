import http from 'node:http'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ViteAliases } from 'vite-aliases'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '^/api/.*': {
        target: 'http://localhost:8000',
        secure: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        agent: new http.Agent({ keepAlive: true, keepAliveMsecs: 20000 }),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'vue-router',
        // 'vue-i18n',
        // 'vue/macros',
        // '@vueuse/head',
        // '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/components.d.ts',
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    ViteAliases({
      useConfig: true,
      useTypescript: true,
    }),
  ],
})
