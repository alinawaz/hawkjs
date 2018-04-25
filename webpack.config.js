const webpack = require("webpack");
var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
    	'bundle': './src/HawkJs.js'
    },
    output: {
        filename: './hawkjs.js',
        library: 'HawkJs',
        libraryTarget:'umd'
    },
    watch: true,
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
        // loaders: [
        //     {
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         loader: 'babel-loader',
        //         query: {
        //             presets: ['es2015']
        //         }
        //     }
        // ],
        rules: [
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        },{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: { 
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          } 
        }]
    }
};