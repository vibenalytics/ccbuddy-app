export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      gtagId: process.env.GTAG_ID || 'G-X3180345DV',
    },
  },
  app: {
    head: {
      title: 'CCBuddy - Pick your Claude Code companion',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Force a legendary companion in Claude Code. Pick your buddy with one command.' },
        { name: 'theme-color', content: '#0c0c0c' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'CCBuddy - Pick your Claude Code companion' },
        { property: 'og:description', content: 'Force a legendary companion in Claude Code. Pick your buddy with one command.' },
        { property: 'og:image', content: '/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'CCBuddy - Pick your Claude Code companion' },
        { name: 'twitter:description', content: 'Force a legendary companion in Claude Code. Pick your buddy with one command.' },
        { name: 'twitter:image', content: '/og.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },
})
