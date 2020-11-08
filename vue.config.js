process.env.VUE_APP_APP_VERSION = require('./package.json').version
process.env.VUE_APP_VERSION = require('./package.json').dependencies.vue

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://my.zuly.it'
      },
      '/socket.io': {
        target: 'https://my.zuly.it',
        ws: true
      }
    }
  },
  publicPath: '/'
}
