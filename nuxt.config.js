export default defineNuxtConfig({
    runtimeConfig: {
        apiSecret: process.env.API_PRIVATE_KEY,
        public: {
            apiBase: process.env.API_URL,
            apiBase2: process.env.API_URL2,
            //apiBase: process.env.API_URL_TEST,
        },
    },
    typescript: false,
    app: {
        head: {
            title: 'ALEO CAT | aleo explorer',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Your Premier Block Explorer and Analytics Platform for Aleo' },
                { name: "google-site-verification", content: "fRM5FTZ5bZt5MRpwplDneJwVFNFflKfq-jVZrpXB3kc" },
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
    modules: [
        'nuxt-primevue',
        '@nuxtjs/sitemap',
    ],
    primevue: {
        options: { ripple: true },
        components: {
            exclude: ['Editor']
        }
    },
    site: {
        url: 'https://aleocat.com',
        gzip: true,
    },
    sitemap: {
        // exclude all app sources
        excludeAppSources: true,
    },
    script: [
        {
            strategy: 'lazyOnload',
            src: 'https://www.googletagmanager.com/gtag/js?id=UA-93461466-1'
        },
        {
            id: 'ga-analytics',
            strategy: 'lazyOnload',
            children: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-93461466-1');
            `
        }
    ],
    css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss'],
});
