const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const mainDir = path.resolve(__dirname, 'fsd')
//const cssLoader = () => {}
//поставить devserver и babel!

module.exports = {
    //где все исходники
    context: path.resolve(__dirname),
    mode: 'development',
    //стартовый файл, откуда начать
    entry: './draft/js/index.js', 
    output: {
        //куда вывести результат
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        //расширения по умолчанию
        extensions: ['.js', 'json'],
        alias: {
            root: __dirname,
            
        }
    },
    //массив с плагинами
    plugins: [
        new HTMLWebpackPlugin({
            //создаваемый хтмл будет основан на конкретном
            filename: 'header.html',
            template: path.resolve (__dirname, './draft/main/uikit/header/header.pug')
        }),
        new HTMLWebpackPlugin({
            filename: 'footer.html',
            template: path.resolve (__dirname, './draft/main/uikit/footer/footer.pug')
        }),
        //чистит папку dist
        new CleanWebpackPlugin,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff)$/,
                use: ['file-loader']
            },
            {
                test: /\.pug$/,
                use: [{
                    loader: 'pug-loader',
                    options: {
                        pretty: true,
                        root: __dirname
                    }
                }]
            }
        ]
    }
}