const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer:{
  //   proxy:{
  //     '/vue':{
  //       target:'http://localhost:2000',
  //       pathRewrite:{
  //         "/vue":"",
  //       },
  //       ws:true,
  //       changeOrigin:true
  //     }
  //   }
  // }
})
