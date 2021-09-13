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
                /** css相关loader配置*/
                test: /\.css$/,
                /**loader执行的顺序是从左往右，从上到下*/
                use: [
                    /**style-loader创建<style>标签，将js样式资源插入到<head>*/
                    'style-loader',
                    /**将css样式文件转化成commonjs以字符串的形式插入到js中*/
                    'css-loader'
                ]
            },
            {
                /** less相关loader配置*/
                test: /\.less$/,
                /*loader执行的顺序是从左往右，从上到下*/
                use: [
                    /**style-loader创建<style>标签，将js样式资源插入到<head>*/
                    'style-loader',
                    /**将css样式文件转化成commonjs以字符串的形式插入到js中*/
                    'css-loader',
                    /**将less文件编译成css文件*/
                    'less-loader'
                ]
            },
            {
                /** css/js文件中插入的图片loader处理，但处理html中的图片，还需要html-loader*/
                test: /\.(jpg|png|gif)$/,
                /**url-loader是在运行在file-loader的基础上，默认使用es6解析*/
                loader: 'url-loader',
                options: {
                    /** 当图片小于等于8kb时，编译成base64位字符串，能减少服务器请求，但是增加打包体积
                     * 但是在webpack5中，url-loader和html-loader不存在语法冲突问题,esModule可以不设置
                     * 也能正常打包编译
                     * */
                    limit: 8 * 1024,
                    /*关闭es6模块解析*/
                    esModule: false,
                    /*对文件名取10为hash值，[ext]为原来文件的扩展名*/
                    name: '[hash:10].[ext]'
                }
            },
            {
                /**html中插入图片解析打包，默认使用commonjs解析*/
                test: /\.html$/,
                loader: 'html-loader',
            }
        ]
    },
    /*plugin相关配置*/
    plugins: [
        /**html-webpack-plugin
         * new HtmlWebpackPlugin会创建以./src/index.html为模板的html文件，并引入打包生成的js文件
         * */
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}