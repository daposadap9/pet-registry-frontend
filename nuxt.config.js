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
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true, // Habilitar el proxy para ocultar la URL completa
  },
  proxy: {
    '/api/': {
      target: 'https://pet-registry-production.up.railway.app', // URL de tu backend
      pathRewrite: { '^/api/': '/api/' },
      changeOrigin: true
    }
  },
  build: {},
  router: {
    middleware: ['auth']
  }
}
