const {
  defineConfig
} = require("@vue/cli-service");
<<<<<<< HEAD
const target = "http://localhost:3000";
=======
const target = "http://localhost:3000/";
>>>>>>> adminPage
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