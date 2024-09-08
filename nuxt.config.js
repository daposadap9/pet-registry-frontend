require('dotenv').config();

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
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  runtimeConfig: {
    apiURL: process.env.VUE_APP_API_URL,  // Usamos la API desde Netlify
  },
  build: {},
  router: {
    middleware: ['auth']
  }
}
