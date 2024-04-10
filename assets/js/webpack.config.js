var path = require('path');
var webpack = require('webpack');
var flatpickr = require("flatpickr");

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
	{
		name: 'blocks',
		context: path.resolve( __dirname, 'src' ),
		entry: {
			'blocks.js': 'admin/main.js',
		},
		output: {
			path: path.resolve( __dirname ),
			filename: '[name]'
		},
		resolve: {
			modules: [
				path.resolve( __dirname, 'src' ),
				'node_modules'
			],
			extensions: [ '.js' ],
			alias: {
				'@': path.resolve( __dirname, 'src' ),
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
				}
			]
		}
	},
	{
		name: 'frontend',
		context: path.resolve( __dirname, 'src' ),
		entry: {
			'frontend.js': 'frontend/main.js',
		},
		output: {
			path: path.resolve( __dirname ),
			filename: '[name]'
		},
		resolve: {
			modules: [
				path.resolve( __dirname, 'src' ),
				'node_modules'
			],
			extensions: [ '.js' ],
			alias: {
				'@': path.resolve( __dirname, 'src' ),
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
			]
		},
	},
	{
		name: 'frontend-css',
		context: path.resolve( __dirname, 'src' ),
		entry: {
			'flatpickr-import.js': 'frontend/lib/flatpickr-css-import.js',
		},
		output: {
			path: path.resolve( __dirname ),
			filename: '[name]'
		},
		resolve: {
			modules: [
				path.resolve( __dirname, 'src' ),
				'node_modules'
			],
			extensions: [ '.js' ],
			alias: {
				'@': path.resolve( __dirname, 'src' ),
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader"
					],
				},
			]
		},
		plugins: [
			new MiniCssExtractPlugin( {
				filename: function( { chunk } ) {
					return `../css/lib/${chunk.name.replace('-import.js', '')}.css`;
				}
			} ),
		],
	},
];
