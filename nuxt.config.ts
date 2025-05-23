// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    target: 'static',
    routeRules: {
        '/': {prerender: true},
        '/help': {prerender: true},
        '/privacyPolicy': {prerender: true},
        '/chooseProxy': {prerender: true},
        '/order/record': {prerender: true},
        '/order/details': {prerender: true},

        '/ja/': {prerender: true},
        '/ja/help': {prerender: true},
        '/ja/privacyPolicy': {prerender: true},
        '/ja/chooseProxy': {prerender: true},
        '/ja/order/record': {prerender: true},
        '/ja/order/details': {prerender: true},

        '/ko/': {prerender: true},
        '/ko/help': {prerender: true},
        '/ko/privacyPolicy': {prerender: true},
        '/ko/chooseProxy': {prerender: true},
        '/ko/order/record': {prerender: true},
        '/ko/order/details': {prerender: true},

        '/fr/': {prerender: true},
        '/fr/help': {prerender: true},
        '/fr/privacyPolicy': {prerender: true},
        '/fr/chooseProxy': {prerender: true},
        '/fr/order/record': {prerender: true},
        '/fr/order/details': {prerender: true},

        '/it/': {prerender: true},
        '/it/help': {prerender: true},
        '/it/privacyPolicy': {prerender: true},
        '/it/chooseProxy': {prerender: true},
        '/it/order/record': {prerender: true},
        '/it/order/details': {prerender: true},

        '/hi/': {prerender: true},
        '/hi/help': {prerender: true},
        '/hi/privacyPolicy': {prerender: true},
        '/hi/chooseProxy': {prerender: true},
        '/hi/order/record': {prerender: true},
        '/hi/order/details': {prerender: true}
    },
    experimental: {
        inlineRouteRules: true
    },
    build: {
        // The vueuc used by naiveUI is commonJS. There is no error in packaging, but there will be an error in preview. Add this configuration to tell nuxt to ignore
        transpile:
            process.env.NODE_ENV === 'production'
                ? [
                    'naive-ui',
                    'vueuc',
                    '@css-render/vue3-ssr',
                    '@juggle/resize-observer'
                ]
                : [ 'naive-ui', 'vueuc', '@juggle/resize-observer' ]
    },
    alias: {
        'vueuc': 'vueuc/es'
    },
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    //To match Cloudflare route matching rules, set the nitro option autoSubfolderIndex to false.
    nitro: {
        prerender: {
            autoSubfolderIndex: false
        }
    },

    // https://nuxt.com/docs/api/configuration/nuxt-config#css
    css: [ '~/assets/css/reset.css', 'flag-icons/css/flag-icons.min.css' ],
    vite: {
        resolve: {
            alias: {
                'vueuc': 'vueuc/es'
            }
        },
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? [ 'naive-ui', 'vueuc' ]
                    : []
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/css/var.scss" as *;@use "~/assets/css/font.scss" as *;@use "~/assets/css/layout.scss" as *;'
                }

            }
        },
        esbuild: {
            drop: process.env.NODE_ENV === 'production' ? [ 'console', 'debugger' ] : []
        }
    },

    components: {
        dirs: [
            '~/components',
            {path: '~/components/buyForm', prefix: 'BuyForm'}
        ]
    },

    // https://nuxt.com/docs/api/configuration/nuxt-config#app
    runtimeConfig: {
        BASE_URL: process.env.NUXT_BASE_URL,
        public: {
            BASE_URL: process.env.NUXT_BASE_URL,
            TURNSTILE_SITE_KEY: 'TURNSTILE_SITE_KEY'
        }
    },
    app: {
        head: {
            // Nuxt will automatically add 8px margin to the body, which must be removed in the configuration file. It's a strange way
            bodyAttrs: {
                style: 'margin: 0'
            }
            /*htmlAttrs: {
             class: colorMode.value
             }*/,
            meta: [
                {name: 'cryptomus', content: '7186cbd7'}
            ]
        },
        pageTransition: {name: 'blur', mode: 'out-in'} // Page transition effects
    },
    modules: [
        'nuxt-icon',
        // '@nuxtjs/seo',
        '@nuxtjs/i18n',
        '@nuxt/content',
        '@pinia/nuxt',
        "nuxtjs-naive-ui"
    ],
    i18n: {
        baseUrl: "https://fastcard.com", // Official environment domain name
        locales: [
            {name: "简体中文", code: "zh", language: "zh-CN"},
            {name: "English", code: "en", language: "en-US"},
            {name: "言語", code: "ja", language: "ja-JP"},
            {name: "한국어", code: "ko", language: "ko-KR"},
            {name: "Français", code: "fr", language: "fr-FR"},
            {name: "Deutsch", code: "ko", language: "de-DE"},
            {name: "Italiano", code: "it", language: "it-IT"},
            {name: "हिन्दी", code: "hi", language: "hi-IN"}
        ],
        defaultLocale: "en",
        detectBrowserLanguage: false,
        // 👇 Reference the Vue I18n config file
        vueI18n: "./i18n.config.ts",
        strategy: "prefix_except_default"
    }
})
