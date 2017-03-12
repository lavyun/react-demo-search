var path = require('path');

module.exports = {
    entry: './src/main.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'main.bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: '/node_modules/',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }]
        }, {
            test: /\.css/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.(png|jpg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            }]
        }]
    }
};