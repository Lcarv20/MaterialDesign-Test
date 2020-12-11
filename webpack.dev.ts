import fs from "fs";
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const indexPathBase = path.relative(__dirname, "./src/index.");

const exts = ["tsx", "jsx", "ts", "js"];

function findEntry(filepath: string, exts: string[]) {
	let res: string = "";
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

const config: webpack.Configuration = {
	mode: "development",
	entry: {
		main: path.resolve(__dirname, findEntry(indexPathBase, exts)),
	},
	devtool: "source-map",
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, "./dist"),
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].bundle.js",
	},

	// <<-- Module loaders transform & improve our assets
	module: {
		rules: [
			// {
			// 	// Loader for ts
			// 	test: /\.(tsx?|jsx?)$/,
			// 	use: "ts-loader",
			// 	exclude: /node_modules/,
			// },
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							"@babel/preset-typescript",
						],
					},
				},
			},
			{
				// css loader
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
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
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
		extensions: [".tsx", ".jsx", "ts", ".js"],
	},
	plugins: [
		// Cleans dist after build
		new CleanWebpackPlugin({
			// Simulate the removal of files
			dry: true,
			// Write Logs to Console
			verbose: true,
			// Automatically remove all unused webpack assets on rebuild
			cleanStaleWebpackAssets: true,
			protectWebpackAssets: false,
		}),

		// The HtmlWebpackPlugin simplifies creation of HTML files to serve
		// webpack bundles, even if they change name (in this case as I just have
		// one entry point (bundle.js) it doens't matter)
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "./public/index.html"), //template
			filename: "index.html", //output file
		}),
		new webpack.HotModuleReplacementPlugin(),

		new ForkTsCheckerWebpackPlugin({
			async: false,
			eslint: {
				files: "./src/**/*.{ts,tsx,js,jsx}",
			},
		}),
	],
};

export default config;
