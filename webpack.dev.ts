import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const indexPathBase = path.relative(__dirname, './src/index.');

const exts = ['tsx', 'jsx', 'ts', 'js'];

function findEntry(filepath: string, exts: string[]) {
	let res: string = '';
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
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, findEntry(indexPathBase, exts)),
	},
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, './dist'),
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},

	// <<-- Module loaders transform & improve our assets
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
						plugins: [
							[
								'@babel/plugin-transform-runtime',
								{
									regenerator: true,
								},
							],
						],
					},
				},
			},
			{
				// Sass loader
				test: /\.(sa|sc|c)ss$/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles postcss to css
					'postcss-loader',
					// Compiles Sass to postcss
					'sass-loader',
				],
			},
			{
				// Image loaders
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				// SVG Loader to convert svg into react component, combined with url-loader
				test: /\.svg$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
			{
				// Font loaders
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	plugins: [
		// Cleans dist after build
		new CleanWebpackPlugin({
			// Simulate the removal of files
			dry: true,
			// Write Logs to Console
			verbose: false,
			// Automatically remove all unused webpack assets on rebuild
			cleanStaleWebpackAssets: true,
			protectWebpackAssets: false,
		}),

		// The HtmlWebpackPlugin simplifies creation of HTML files to serve
		// webpack bundles, even if they change name (in this case as I just have
		// one entry point (bundle.js) it doens't matter)
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
			filename: 'index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),

		new ForkTsCheckerWebpackPlugin({
			async: false,
			eslint: {
				files: './src/**/*.{ts,tsx}',
			},
		}),
	],
};

export default config;
