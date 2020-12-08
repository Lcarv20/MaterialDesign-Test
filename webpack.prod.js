const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		main: path.resolve(__dirname, "src/client/index.js"),
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	// -->>

	// <<-- Module loaders transform & improve our assets
	module: {
		rules: [
			{
				test: "/.js$/",
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				// Sass loader
				test: /\.(scss|css)$/,
				use: [
					// Creates `style` nodes from JS strings
					MiniCssExtractPlugin.loader,
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

		/* This plugin extracts CSS into separate files.
		It creates a CSS file per JS file which contains CSS.
		It supports On-Demand-Loading of CSS and SourceMaps.*/
		new MiniCssExtractPlugin({ filename: "[name].css" }),

		// The HtmlWebpackPlugin simplifies creation of HTML files to serve
		// webpack bundles, even if they change name (in this case as I just have
		// one entry point (bundle.js) it doens't matter)
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "./src/client/views/template.html"),
			filename: "index.html",
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
			new TerserPlugin({}),
			new CssMinimizerPlugin(),
		],
	},
};
