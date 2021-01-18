const Wconfig = require("./webpack.config");
const path = require("path");
const { env } = require("process");
const HtmlWebpackPlugin = require('html-webpack-plugin');

Wconfig.entry = [path.join(__dirname, "src", "Client", "main.ts")];
Wconfig.output = {
	path: path.join(__dirname, "dist", "Client"),
	publicPath: "/dist/Client/",
	filename: "bundle.js",
	chunkFilename: "[name].js",
};

if (env["BUILD_ENV"] == "DEV") {
	Wconfig.watch = true;
}

Wconfig.devServer = {
	contentBase: path.join(__dirname, "dist", "Client"),
	inline: true,
	host: "localhost",
	port: 8080,
};

Wconfig.plugins.push(new HtmlWebpackPlugin({
	title: "蝌蚪聊天室"
}));

Wconfig.target = "web";

module.exports = Wconfig;
