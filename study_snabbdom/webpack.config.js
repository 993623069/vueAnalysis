//创建webpack.config.js
const webpack = require('webpack');
const path = require("path");
module.exports = {
  mode:'development',
     entry:'./src/index.js', //入口文件
     output:{
          //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径 
         // path:__dirname, //输出位置
          filename:'bundle.js' //输入文件
     },
     devServer:{
      contentBase: path.join(__dirname,"www"),
      compress:false,
      port:8080,
      publicPath:'/xuni/'
     }

}