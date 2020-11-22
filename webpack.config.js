const path = require('path');

module.exports = {
    entry: './ts/app.ts',
    output: {
        filename: 'app.js',
        path: __dirname + './js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{test: /\.ts$/, use: 'awesome-typescript-loader'}]
    },
    devServer: {
        port: 3000
    }
}