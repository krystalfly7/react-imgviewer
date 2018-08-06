var path = require('path');
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production';
var loadRules = require('./loadRules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var DOMO_PATH = './example';
var LID_PATH = './lib';
var publicPath = '/';


var config = {
    entry: {
        "index": ['./example/app.js']
    },
    module: {
      rules: loadRules,
      noParse: [/\.min\.js$/]
    },
    output: {
        path: path.join(__dirname, DOMO_PATH),
        filename: '[name].js',
        // publicPath: publicPath,
        chunkFilename: '[name].[chunkhash].js',
        libraryTarget: 'umd'
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
        disable: false,
        allChunks: true
      })
    ],
    target: "web",
    devServer: {
        contentBase: DOMO_PATH,
        historyApiFallback: true,
        hot: true,
        port: 8080,
        publicPath: publicPath,
        noInfo: false,
        stats: {
    			assets: true,
    			children: false,
    			chunks: false,
    			hash: false,
    			modules: false,
    			publicPath: false,
    			timings: true,
    			version: false,
    			warnings: true,
    			colors: {
    				green: '\u001b[32m',
    			}
    		},
    }
};

if(isProd) {
    config.entry = {
        "index": ['./src/index.js']
    }
    config.output.path = path.join(__dirname, LID_PATH);
    config.plugins.push(
      new CleanWebpackPlugin(
          ['lib'],
          {
              root: path.join(__dirname),
              verbose:  true,
              dry:      false
          }
      )
    )
} else {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(
          ['index.css','index.js'],
          {
              root: path.join(__dirname, DOMO_PATH),  //根目录
              verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
              dry:      false        　　　　　　　　　　//启用删除文件
          }
      )
    )
}
module.exports = config;
