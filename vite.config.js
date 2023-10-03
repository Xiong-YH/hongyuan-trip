import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

import pxtovw from 'postcss-px-to-viewport'
const loder_pxtovw = pxtovw({
//这里是设计稿宽度 自己修改
  viewportWidth: 375,
  viewportUnit: 'vw'
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [loder_pxtovw]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
