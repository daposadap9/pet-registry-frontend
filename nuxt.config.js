export default {
  target: 'static',
  head: {
    title: 'pet-registry-frontend',
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
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    // Configura la baseURL si es necesario
    baseURL: 'https://pet-registry-production.up.railway.app/api'
  },
  build: {},
  router: {
    middleware: ['auth']
  }
}
