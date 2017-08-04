var path = require('path')
var webpack = require('webpack')

var utils = require('./utils')
var config = require('../config')

module.exports = {
	entry: ["vue", "vue-resource", "vue-router"],
	output: {
		filename: "vendor.js", // best use [hash] here too
		path:path.join(config.build.assetsRoot),
		library: "vendor_lib_[hash]",
	},
	plugins: [
		new webpack.DllPlugin({
			name: "vendor_lib_[hash]",
			path:  path.join(__dirname, "..","dist","vendor-manifest.json"),
			context:path.join(__dirname,'..','src')
		}),
        new webpack.optimize.UglifyJsPlugin()
	]
};