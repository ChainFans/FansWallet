
module.exports = {
  // baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  publicPath: './',
  productionSourceMap: false,
  css: {
    sourceMap: false,
  },
  // outputDir:'dist',
  // devServer:{
  //   port:8080,
  //   open:true,
  //   before:function(app){
  //     app.get('/api/test',(req,res)=>{
  //       res.json()
  //     })
  //   }
  // },
  chainWebpack: (config) => {
    /* 添加分析工具*/
    if (process.env.NODE_ENV === 'production') {
        if (process.env.npm_config_report) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end();
            config.plugins.delete('prefetch')
        }
    };
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 或者
    // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
   },
  configureWebpack: {
    externals: {
      // 'vue': "Vue",
      // // 前面的vue指的是使用时的名字，后面的Vue是加载的包名
      // 'vue-router': 'VueRouter',
      // 'vuex': 'Vuex',
      'Swiper': 'Swiper'
    }
  } 
}
