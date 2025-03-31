// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  
  app: {
    baseURL:'/',
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        }
      ]
    }
  },
  css: ['@/assets/css/style.css'],
  runtimeConfig:{
    public:{
      apiBase:'https://twinsteam.co/clients/carschrome/shop/carsapi.php',
      siteUrl:'https://twinsteam.co/clients/carschrome/shop/',
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  plugins: ['~/plugins/api'],
  modules: ['@nuxtjs/i18n', 'nuxt-swiper', '@pinia/nuxt', '@vee-validate/nuxt', '@element-plus/nuxt'],
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default', // URLs will have '/ar' but '/en' is default
    detectBrowserLanguage: {
      /* useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true */


      useCookie: false, // Disable remembering last selected locale
      /* redirectOn: 'root' */

      /* alwaysRedirect: false, // Prevent forced redirection
      fallbackLocale: 'en'  // Ensure default locale loads on `/` */
    }
  }
})