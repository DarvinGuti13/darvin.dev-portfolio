// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon'
  ],

  // Asegúrate de tener este archivo: /assets/css/tailwind.css
  css: ['~/assets/css/tailwind.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      titleTemplate: (chunk) =>
        chunk ? `${chunk} — Darvin` : 'Darvin Gutiérrez — Portafolio',
      meta: [
        { name: 'description', content: 'Portafolio de Darvin Gutiérrez — Desarrollador de Software en Costa Rica.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Poppins:wght@600;700&display=swap'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://tu-dominio.com',
      contactEmail: 'darvinjafet13@email.com',
      phoneE164: '+50662044488',
      whatsapp: '+50662044488'
    }
  },

  image: {
    format: ['webp', 'avif']
  }
})
