export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jwt-auth',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  router: {
    middleware: [
      'clearValidationErrors'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/mixins/validation',
    './plugins/axios',
    './plugins/mixins/user'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/login', method:'post', propertyName: 'token'
          },
          logout: {
            url: 'auth/logout', method:'post'
          },
          user: {
            url: 'user', method:'get', propertyName: 'data'
          }
        }
      } 
    },
    redirect: {
      login:'/auth/login',
      home: '/'
    },    
    plugins: [
      './plugins/auth'
    ]    
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'

  ],
  axios: {
    baseURL: 'http://localhost:8000/api'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  }
}
