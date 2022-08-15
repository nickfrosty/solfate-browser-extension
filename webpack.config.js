var webpack = require("webpack"),
  path = require("path"),
  fileSystem = require("fs-extra"),
  env = require("./utils/env"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  TerserPlugin = require("terser-webpack-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ASSET_PATH = process.env.ASSET_PATH || "/";

var alias = {
  "react-dom": "@hot-loader/react-dom",
};

// load the secrets
var secretsPath = path.join(__dirname, "secrets." + env.NODE_ENV + ".js");

var fileExtensions = [
  "ico",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}

var options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    /* Build entries for major pages */
    profile: path.join(__dirname, "src", "pages", "Profile", "index.jsx"),
    ipfs: path.join(__dirname, "src", "pages", "ipfs", "index.jsx"),
    arwv: path.join(__dirname, "src", "pages", "arwv", "index.jsx"),
    /* Build entries for extension pages */
    options: path.join(__dirname, "src", "pages", "Options", "index.jsx"),
    popup: path.join(__dirname, "src", "pages", "Popup", "index.jsx"),
    background: path.join(__dirname, "src", "pages", "Background", "index.js"),
    contentScript: path.join(__dirname, "src", "pages", "Content", "index.js"),
    // devtools: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.js'),
    panel: path.join(__dirname, "src", "pages", "Panel", "index.jsx"),
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["devtools"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        type: "asset/resource",
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
      { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "source-map-loader",
          },
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => "." + extension)
      .concat([".js", ".jsx", ".ts", ".tsx", ".css", ".json"]),
    fallback: {
      buffer: require.resolve("buffer"),
      // url: require.resolve("url"),
      // url: false,
      // assert: require.resolve("assert-browserify"),
      // http: require.resolve("stream-http"),
      // https: require.resolve("https-browserify"),
      // crypto: require.resolve("crypto-browserify"),
      // os: require.resolve("os-browserify/browser"),
      // stream: require.resolve("stream-browserify"),
      // path: require.resolve("path-browserify"),
      // constants: require.resolve("constants-browserify"),
      // util: false,
      // util: require.resolve("util"),
    },
  },
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: path.join(__dirname, "build"),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              }),
            );
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/img/favicon.ico",
          to: path.join(__dirname, "build"),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/img/icon.png",
          to: path.join(__dirname, "build"),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/img/icons",
          to: path.join(__dirname, "build/icons"),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/pages/Content/content.styles.css",
          to: path.join(__dirname, "build"),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      favicon: "src/assets/img/favicon.ico",
    }),
    /**
     *
     */
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "Profile", "index.html"),
      filename: "profile.html",
      chunks: ["profile"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "ipfs", "index.html"),
      filename: "ipfs.html",
      chunks: ["ipfs"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "arwv", "index.html"),
      filename: "arwv.html",
      chunks: ["arwv"],
      cache: false,
    }),
    /**
     *
     */
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "Options", "index.html"),
      filename: "options.html",
      chunks: ["options"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "Popup", "index.html"),
      filename: "popup.html",
      chunks: ["popup"],
      cache: false,
    }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.html'),
    //   filename: 'devtools.html',
    //   chunks: ['devtools'],
    //   cache: false,
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "Panel", "index.html"),
      filename: "panel.html",
      chunks: ["panel"],
      cache: false,
    }),
  ],
  infrastructureLogging: {
    level: "info",
  },
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-source-map";
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
