/**
 *
 */

const {resolve} = require('path')

module.exports = {
    /*打包入口文件*/
    entry: './src/index.js',
    /*打包文件出口*/
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    /*loaders相关配置*/
    module: {
        rules: [
            /*loader配置*/
            {
                test: /\.css$/,
                /*loader执行的顺序是从左往右，从上到下*/
                use: [
                    /*style-loader创建<style>标签，将js样式资源插入到<head>*/
                    'style-loader',
                    /*将css样式文件转化成commonjs以字符串的形式插入到js中*/
                    'css-loader'
                ]
            }
        ]
    },
    /*模式*/
    mode: 'development'
}