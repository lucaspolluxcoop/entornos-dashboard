export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'entornos-administracion',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/nucleo/css/nucleo.css',
    '@/assets/sass/argon.scss',
    '@/assets/css/style.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'element-ui/lib/theme-chalk/index.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/api',
    '@/plugins/dashboard/dashboard-plugin',
    '@/plugins/dataServices',
    '@/plugins/fontawesome.js',
    '@/plugins/elementUi',
    '@/plugins/filters',
    '@/plugins/validationMessages'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/schemes/local.html#options
   */
  auth: {
    cookie: {
      prefix: 'auth.tunota.',
      options: {
        path: '/',
        expires: 30,
        secure: false,
      }
    },
    strategies: {
      local: {
        scheme: '@/schemes/CustomPassportScheme',
        token: {
          property: 'access_token',
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token'
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/oauth/token', method: 'post' },
          refresh: { url: '/oauth/refresh', method: 'post' },
          user: { url: '/api/user', method: 'get' },
          logout: { url: '/oauth/logout', method: 'post' }
        },
        clientId: process.env.API_CLIENT_ID,
        clientSecret: process.env.API_CLIENT_SECRET,
        grantType: 'password'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/dashboard'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000',
    credentials: true
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3001',
    apiURL: process.env.API_URL || 'http://localhost:8000'
  },

  privateRuntimeConfig: {
    baseURL: process.env.API_URL || 'http://localhost:8000',
    clientId: process.env.API_CLIENT_ID,
    clientSecret: process.env.API_CLIENT_SECRET,
  }
}
