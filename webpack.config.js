const path = require("path");
module.exports = {
	mode: "development",
	watch: false,
	module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
	},
	resolve: {
		extensions: [".json",".ts",".tsx", ".js", ".jsx"],
  },
  devtool: "inline-source-map",
  plugins: []
};
