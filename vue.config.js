const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //配置代理
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
})
