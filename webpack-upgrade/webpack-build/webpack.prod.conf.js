var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#cheap-module-source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
       // 最紧凑的输出 
      beautify: false, 
      // 删除所有的注释 
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告   
        warnings: false,
        // 暂删除所有的 `console` 语句 
        drop_console: false, 
        // 内嵌定义了但是只用到一次的变量 
        collapse_vars: true, 
        // 提取出出现多次但是没有定义成变量去引用的静态值 
        reduce_vars: true, 
      } 
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    //  hash will generate from relative path than ...
   new webpack.HashedModuleIdsPlugin(),
    // common chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'chunk',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        // awesome!! better than use a file including all vendor js 
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf( path.join(__dirname, '../node_modules') ) !== 0 
        )
      }
    }),
    // attention: plugins' order , normal first, run-time second
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname,'..','src'),
      manifest: require('../dist/vendor-manifest.json'),
    })
    
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
