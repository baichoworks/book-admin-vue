const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //配置代理
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
})
