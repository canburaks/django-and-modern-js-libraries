const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const isEnvProduction = mode === 'production';

const productionSettings = {
	mode,
	entry: {
		bundle: ['./index.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
        path: path.resolve(__dirname, '../static'),
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].[id].js'
	},
    optimization: {
		minimize: true,
		runtimeChunk: false,
	  },
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	devtool: false,
	plugins: [
		new MiniCssExtractPlugin({filename: '[name].css'})
	],
};

const devSettings = {
	mode,
	entry: {
		bundle: ['./index.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		publicPath: "/",
		filename: 'static/js/bundle.js',
		chunkFilename: 'static/js/[name].chunk.js',
	},
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		stats: 'minimal',
	  },
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	mode,
	plugins: [
	],
}


module.exports = isEnvProduction ? productionSettings : devSettings;