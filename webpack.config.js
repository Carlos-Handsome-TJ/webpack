/**
 *plugin与loader的区别：
 * plugin需要导入，loader直接使用
 */

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    /*模式*/
    mode: 'production',
    /*打包入口文件*/
    entry: './src/index.js',
    /*打包文件出口*/
    output: {
        /*输出文件名*/
        filename: 'built.js',
        /*输出路径*/
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
    /*plugin相关配置*/
    plugins: [
        /*html-webpack-plugin
        * new HtmlWebpackPlugin会创建以./src/index.html为模板的html文件，并引入打包生成的js文件
        * */

        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}