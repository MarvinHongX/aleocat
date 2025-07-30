export default defineNuxtConfig({
  runtimeConfig: {
      apiSecret: process.env.API_PRIVATE_KEY,
      apiBase: process.env.API_URL,
      apiBase2: process.env.API_URL2,
      apiBase3: process.env.API_URL3,
      apiBasePrice: process.env.API_URL_PRICE,
      apiPriceKey: process.env.API_PRICE_KEY
  },

  typescript: {
      typeCheck: false
  },

  app: {
      head: {
          title: 'Aleocat - Aleo Chain Explorer',
          meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Your Premier Block Explorer and Analytics Platform for Aleo' },
            { name: 'keywords', content: 'aleo, explorer, aleo explorer, aleocat, aleo block explorer, block explorer' },
            { name: "google-site-verification", content: "fRM5FTZ5bZt5MRpwplDneJwVFNFflKfq-jVZrpXB3kc" },

            // ✅ Open Graph
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: 'Aleocat - Aleo Chain Explorer' },
            { property: 'og:site_name', content: 'Aleocat - Aleo Chain Explorer' },
            { property: 'og:description', content: 'Your Premier Block Explorer and Analytics Platform for Aleo' },
            { property: 'og:image', content: 'https://aleocat.com/layout/images/logo-color.png' },
            { property: 'og:url', content: 'https://aleocat.com' }
          ],
          script: [
              { src: 'https://www.googletagmanager.com/gtag/js?id=UA-93461466-1' },
              {
                  id: 'ga-analytics',
                  children: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'UA-93461466-1');
                  `
              }
          ],
          link: [
              {
                  id: 'theme-css',
                  rel: 'stylesheet',
                  type: 'text/css',
                  href: '/themes/md-light-indigo/theme.css'
              }
          ]
      }
  },

  modules: ['nuxt-primevue', '@nuxtjs/sitemap', "@nuxt/image"],

  primevue: {
      options: { ripple: true },
      components: {
          exclude: ['Editor']
      }
  },

  sitemap: {
      sitemaps: {
          pages: {
              includeAppSources: true,
            },        
      }
  },

  css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss'],
  compatibilityDate: '2024-10-30',
});