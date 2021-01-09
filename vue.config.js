const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// 配置文件路径的别名----重新设置就需要重新启动一下项目
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
  },

  // 配置sass全局变量
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~assets/css/var.scss";`
      }
    }
  }
}
