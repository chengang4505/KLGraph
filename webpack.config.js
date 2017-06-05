var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        // path: 'build/js',
        path: 'docs/assert',
        // path: path.resolve(__dirname, '../Demo/static/js'),
        filename: 'klgraph.js',
        library: 'KLGraph',
        libraryTarget: 'umd',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.glsl/,
                use: 'raw-loader'
            }
        ]
    },
    // plugins: [
    //     new CopyWebpackPlugin([
    //         {from:'build/js/klgraph.js',to:path.resolve(__dirname, '../Demo/static/js')}
    //     ])
    // ]
}