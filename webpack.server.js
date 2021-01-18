const Wconfig = require("./webpack.config");
const path = require("path");
const { env } = require("process");

Wconfig.entry = [path.join(__dirname, "src", "Server", "main.ts")];
Wconfig.output = {
	path: path.join(__dirname, "dist", "Server"),
	publicPath: "/dist/Server/",
	filename: "bundle.js",
	chunkFilename: "[name].js",
};

if (env["BUILD_ENV"] == "DEV") {
	Wconfig.watch = true;
}

Wconfig.target = "node";

module.exports = Wconfig;
