const {
  defineConfig
} = require("@vue/cli-service");
const target = "http://192.168.0.24:3000/";
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    port: 8080,
    historyApiFallback: true,
    proxy: {
      "^/api": {
        target,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/api": "/"
        },
      },
    },
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});