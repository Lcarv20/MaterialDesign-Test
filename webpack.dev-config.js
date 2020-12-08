const path = require("path");
//const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	// <<-- Entry (index.js) gonna be transformed to bundle.js
	entry: {
		index: "./src/index.js",
		headerscript: "./src/header-scripts.js",
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	// -->>

	devtool: "inline-source-map",

	// <<-- Module loaders transform & improve our assets
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				// Image loaders
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				// Font loaders
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		// Cleans dist after build
		new CleanWebpackPlugin(),

		// The HtmlWebpackPlugin simplifies creation of HTML files to serve
		// webpack bundles, even if they change name (in this case as I just have
		// one entry point (bundle.js) it doens't matter)
		new HtmlWebpackPlugin({
			title: "Material Ui Starter Kit",
		}),
	],
	optimization: {},
};
