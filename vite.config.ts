import { defineConfig } from 'vite'
import * as path  from 'path'
import vue from '@vitejs/plugin-vue'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  },
  server:{
    open: true,//服务启动时自动在浏览器中打开应用
    proxy:{
      '/iotApi': {
        target: 'https://dev-api.yunmaolink.com',
        changeOrigin: true,
        rewrite: (path)=>{
          return path.replace(/^\/iotApi/, '')
        }
      },
      '/workOrder': {
        target: 'https://dev-api.yunmaolink.com/ym-work-order/u',
        changeOrigin: true,
        rewrite: (path)=>{
          return path.replace(/^\/workOrder/, '')
        }
      }
    }
  }
})
