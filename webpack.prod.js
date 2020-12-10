const fs = require("fs");
const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const indexPathBase = path.relative(__dirname, "./src/index.");

const exts = ["tsx", "jsx", "ts", "js"];

function findEntry(filepath, exts) {
	let res;
	for (let i = 0; i < exts.length; i++) {
		if (fs.existsSync(filepath + exts[i])) {
			if (res) {
				throw `There is more than one entry ${res} ${filepath + exts[i]}`;
			} else {
				res = filepath + exts[i];
			}
		}
	}
	return res;
}

module.exports = {
	mode: "production",
	entry: {
		main: path.resolve(__dirname, findEntry(indexPathBase, exts)),
	},
	// <<-- Module loaders transform & improve our assets
	module: {
		rules: [
			{
				// Loader for ts
				test: /\.(tsx?|jsx)$/,
				exclude: /node_modules/,
				use: "ts-loader",
			},

			{
				// css loader in case I, or someone prefers to (although not needed, but it prevents anxiety levels from rising)
				test: /\.css$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
				],
			},
			{
				// Sass loader
				test: /\.(scss|css)$/,
				use: [
					// Creates `style` nodes from JS strings
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles postcss to css
					"postcss-loader",
					// Compiles Sass to postcss
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
	resolve: {
		extensions: [".tsx", ".jsx", ".ts", ".js"],
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
			template: path.resolve(__dirname, "./public/index.html"),
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

	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
};
