import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { ViteAliases } from 'vite-aliases'

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: {
  //     '~/': `${path.resolve(__dirname, 'src')}/`,
  //   },
  // },
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
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      vueTemplate: false,
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
