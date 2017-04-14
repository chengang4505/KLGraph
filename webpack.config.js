var webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        path: 'build/js',
        filename: 'bundle.js',
        library:'KLGraph',
        libraryTarget:'window',
    },
    devtool:'source-map',
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
    }
}