/*
    Aca almacenamos toda la configuracion que necesitaremos para nuestro proyecto
*/

const path = require('path');
//Añadir el recurso HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Añadir el recurso CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Añadir el recurso CSS Optimizacion
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//Añadir el recurso de Terser
const TerserPlugin = require('terser-webpack-plugin');
//Añadir el recurso de Clean
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


//Modulo de un objeto con la configuracion deseada
module.exports = {
    //Punto de entrada de nuestra aplicación
    entry: './src/index.js',
    //Punto de salida
    output: {
        //Permite saber en que directorio esta nuestro proyecto
        path: path.resolve(__dirname, 'dist'),
        //Nombre del resultante de JS
        filename: 'bundle.js',
        publicPath: "/"
    },
    resolve: {
        //Extensiones que vamos a utilizar
        extensions: ['.js', '.jsx'],
        //Alias que usaremos
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@styles': path.resolve(__dirname, 'src/styles/')
        }
    },
    mode: 'production',
    module: {
        //Reglas que establecemos para trabajar con diferentes tipos de archivos
        rules: [{
            //Test para saber que tipo de extensiones vamos a utilizar
            //Utiliza cualquier extension js o jsx
            test: /\.(js|jsx)$/,
            //Excluir elementos de node_modules
            exclude: /node_modules/,
            //Pasar internamente el loader que utilizaremos (babel)
            use: {
                loader: 'babel-loader'
            }
        }, {
            //Utiliza cualquier archivo de extension html
            test: /\.html$/,
            //Pasar internamente el loader que utiliza (html)
            use: {
                loader: 'html-loader'
            }
        }, {
            //Utiliza cualquier archivo de extension scss
            test: /\.s[ac]ss$/,
            //Pasar internamente el loader que utiliza (style, css, sass)
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    plugins: [
        //Instancia del plugin de html
        new HtmlWebpackPlugin({
            //Configuración del plugin
            //Ubicacion del index.html para transformarlo con los elementos que le indiquemos
            template: './public/index.html',
            //Salida de la preparación de HTML a partir del template
            filename: './index.html'
        }),
        //Instancia del plugin de css
        new MiniCssExtractPlugin({
            //Salida de la preparación de CSS
            filename: '[name].css'
        }),
        //Instancia del plugin clean
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        //Configuracion de minimize
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
}