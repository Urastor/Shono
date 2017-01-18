import config from './config';
import webpack from 'webpack';

export default {
    output: {
        filename: config.output.filename,
        library: config.libraryName,
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}
