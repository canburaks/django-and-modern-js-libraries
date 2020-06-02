const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// checks if it is production bundling or development bundling 
const isEnvProduction = process.argv.includes("production")

// our JS root file
const entrypoint = './index.js'

const productionSettings = {
	mode: "production",
	entry: entrypoint,
	output: {
        // output directory will be the root directory of django
        path: path.resolve(__dirname, '../'),
        // this is the bundled code we wrote
        filename: 'static/js/[name].js',
        // this is the bundled library code
	    chunkFilename: 'static/js/[name].chunk.js'
	},
    optimization: {
		minimize: true,
		splitChunks: {
		  chunks: 'all',
		  name: true,
		},
		runtimeChunk: false,
	  },
	devServer: {
		historyApiFallback: true,
		stats: 'normal',
      },

	module: {
		rules: [
            {
                loader: 'babel-loader',
                test: /\.js$|jsx/,
                exclude: /node_modules/
            },
			{
				test: /\.css$/i,
				use: [
					//{loader: MiniCssExtractPlugin.loader, options: {
					//	  //your styles extracted in a file for production builds.
					//	  //hmr: isEnvDevelopment,
					//	},
					//  },
				  // IMPORTANT => don't forget `injectType`  option  
				  { loader: 'style-loader', options: { injectType: 'styleTag' } },
				  //"css-loader"
				  //{ loader: 'sass-loader' },
				],
			},
			{
				test: /\.css$/i,
				use: [
					{loader: MiniCssExtractPlugin.loader, options: {
						  //your styles extracted in a file for production builds.
						  hmr: false, //isEnvDevelopment,
						},
					  },
					  "css-loader", "postcss-loader"
				],
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
		    
			// ENTRYPOINT - this is where webpack read our app for bundling
			template: "./src/index.html",
			
			// OUTPUT FILE
			// this is emitted bundle html file
			// ----------------------------------
			// django will use this as template after bundling
			// -----------------------------------
            filename:"./templates/index.html"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[name].chunk.css',
          }),
	]
};

const devSettings = {
	mode: "development",
    entry: entrypoint,
	output: {
		path: path.resolve(__dirname, './build'),
		publicPath: "/",
		filename: 'static/js/bundle.js',
		chunkFilename: 'static/js/[name].chunk.js',
	},
	devtool: 'inline',
	devServer: {
		historyApiFallback: true,
		contentBase: './dist',
		stats: 'minimal',
	  },
	module: {
		rules: [
            {
                loader: 'babel-loader',
                test: /\.js$|jsx/,
                exclude: /node_modules/
            },
			{
				test: /\.css$/i,
				use: [
					//{loader: MiniCssExtractPlugin.loader, options: {
					//	  //your styles extracted in a file for production builds.
					//	  //hmr: isEnvDevelopment,
					//	},
					//  },
				  // IMPORTANT => don't forget `injectType`  option  
				  { loader: 'style-loader', options: { injectType: 'styleTag' } },
                  "postcss-loader"
                  //"css-loader"
				  //{ loader: 'sass-loader' },
				],
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		})
	]
};

module.exports = isEnvProduction ? productionSettings : devSettings;