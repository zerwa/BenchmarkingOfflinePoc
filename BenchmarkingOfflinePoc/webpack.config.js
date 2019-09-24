const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var config = (env, options) => {
    let isProduction;

    if (env && env.NODE_ENV && env.NODE_ENV !== 'development') {
        isProduction = true;
    } else if (options && options.mode === 'production') {
        isProduction = true;
    } else {
        isProduction = false;
    }

    return {
        name: 'web',
        mode: isProduction ? 'production' : 'development',
        entry: {
            client: './ClientApp/boot-client.tsx'
        },
        output: {
            path: path.resolve(__dirname, './wwwroot/dist'),
            publicPath: '/dist/',
            filename: isProduction ? '[name].[contenthash].js' : 'main.[hash].bundle.js'
        },
        resolve: {
            //automatically infer '.ts' and '.tsx' when importing files
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: isProduction ?
                        [MiniCssExtractPlugin.loader, 'css-loader'] :
                        ['style-loader', 'css-loader']
                },
                {
                    test: /\.tsx?$/,
                    include: path.resolve(__dirname, "./ClientApp/"),
                    loader: "awesome-typescript-loader"
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|ttf|otf|woff|woff2|eot)$/,
                    loader: 'url-loader?limit=4096'
                }
            ]
        },

        //see https://webpack.js.org/configuration/devtool/ for options
        devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",

        plugins: isProduction ? [new MiniCssExtractPlugin()] : [
            new CleanWebpackPlugin(),
            new WorkboxWebpackPlugin.InjectManifest({
                swSrc: "./ClientApp/src-sw.js",
                swDest: "../sw.js"
            })
        ]
    };
};

module.exports = config;
