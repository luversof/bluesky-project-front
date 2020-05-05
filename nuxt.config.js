export default {
  mode: "spa", // universal / spa
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/moment"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    "nuxt-fontawesome",
    [
      "nuxt-i18n",
      {
        locales: ["ko"],
        defaultLocale: "ko",
        vueI18n: {
          fallbackLocale: "ko",
          messages: require("./static/message.json"),
        },
      },
    ],
    "@nuxtjs/proxy",
  ],
  // /*
  //  ** Build configuration
  //  */
  // build: {
  //   publicPath: "/nuxtfiles/",
  //   /*
  //    ** You can extend webpack config here
  //    */
  //   extend(config, ctx) {}
  // },
  proxy: {
    // proxyTable 설정
    "/api": {
      target: "http://localhost:8084/",
      changeOrigin: true,
    },
  },
  fontawesome: {
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons", // Solid icons
        icons: ["fas"],
      },
      {
        set: "@fortawesome/free-brands-svg-icons", // Brand icons
        icons: ["fab"],
      },
      {
        set: "@fortawesome/free-regular-svg-icons", // Regular icons
        icons: ["far"],
      },
    ],
  },
  moment: {
    locales: ["ko"],
  },
};
