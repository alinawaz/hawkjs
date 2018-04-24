const webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: {
    	'bundle': './src/HawkJs.js'
    },
    output: {
        filename: './hawkjs.js',
        library: 'HawkJs',
    	libraryTarget:'umd'
    },
    resolve: {
      modules: [
        path.resolve('./src/')
      ]
    },
   //  plugins: [
   //  	new webpack.optimize.UglifyJsPlugin({
   //    		minimize: false
   //  	})
  	// ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ],
    }
};