//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const axios = require('axios');
module.exports = {
  server: {
    port: 3000, // default: 3000
    host: '127.0.0.1', // default: localhost,
    timing: false    
  },
  env: {
    //baseUrl: 'https://vietnambis.com'
    baseUrl: 'http://localhost:3000'
  },  
   //render: { resourceHints: false },   
  head: {
    title: 'Vietnam BIS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Find business information, tax codes in vietnam, more than 1.8m businesses in Vietnam' },
      /*Prioritize the latest version of IE and Chrome */
      { name: 'renderer', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      /* iOS device */
      { name: 'author', content: 'admin@vietnambis.com' },
      { name: 'apple-mobile-web-app-title', content: 'Vietnam business database, more than 2.0m businesses in Vietnam' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#263238' },
      /*fullscreen and app mode*/
      { name: 'screen-orientation', content: 'portrait' },
      { name: 'x5-orientation', content: 'portrait' },
      { name: 'full-screen', content: 'yes' },
      { name: 'x5-fullscreen', content: 'true' },
      { name: 'browsermode', content: 'application' },
      { name: 'x5-page-mode', content: 'app' },
      /*webkit*/
      { name: 'theme-color', content: '#263238' },      
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
   modules: [
      //  ['@nuxtjs/html-minifier', { log: 'once', logHtml: true }]   
      '@nuxtjs/component-cache',
      '@nuxtjs/strapi',//https://strapi.nuxtjs.org/
      '@nuxtjs/proxy',   
    // With options
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
    '@nuxtjs/sitemap'  
    ],
    proxy: {//theo huong dan https://strapi.nuxtjs.org/proxy/
      '/api/strapi': {
        target: 'http://localhost:1337',
        pathRewrite: {
          '^/api/strapi': '/' //rewrite /api/strapi to http://localhost:1337
        }
      }
    },
    strapi: {
      url: '/api/strapi'
    },
   sitemap: {     
    path: '/sitemapindex.xml',
    hostname: 'https://vietnambis.com',
    gzip: true,
    generate: false,
    exclude: [
       '/acontact',
       '/admin',
       '/login'
     ],    
    sitemaps: [
      {
        path: '/sitemap-vn.xml',
        lastmod: new Date().toISOString(),
        gzip: true,
        generate: true,
        exclude: [
          '/admin',
          '/login',
          '/vn/date',
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
       const { data } = await axios.get(`https://vietnambis.com/api/business/geturls/1`)
       return data.businesses.map(url => `/vn/${url.vnslug}-${url.id}.html`)
        }
     },       
      {
        path: '/sitemap-en.xml',
        lastmod: new Date().toISOString(),
        gzip: true,
        generate: true,
        exclude: [
          '/admin',
          '/vn/date',
          '/login',          
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
          const { data } = await axios.get(`https://vietnambis.com/api/business/geturls/1`)
          return data.businesses.map(url => `/${url.slug}-${url.id}.html`)
        }
      },
      {
        path: '/provinces-vn.xml',        
        gzip: true,
        generate: true,
        exclude: [
          '/admin',
          '/vn/date',
          '/login',          
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
          const { data } = await axios.get(`https://vietnambis.com/api/province/list`)          
          return data.list.map(url => `/vn/tinh-thanh/${url.slug}-${url.id}`)
        }
      },
      {
        path: '/provinces-en.xml',        
        gzip: true,
        generate: true,
        exclude: [
          '/admin',
          '/vn/date',
          '/login',          
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
          const { data } = await axios.get(`https://vietnambis.com/api/province/list`)
          return data.list.map(url => `/province/${url.slug}-${url.id}`)
        }
      },
      {
        path: '/districts-vn.xml',        
        gzip: true,
        generate: false,
        exclude: [
          '/admin',
          '/vn/date',
          '/login',          
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
          const { data } = await axios.get(`https://vietnambis.com/api/district/list`)          
          return data.list.map(url => `/vn/huyen/${url.slug}-${url.id}`)
        }
      },
      {
        path: '/districts-en.xml',        
        gzip: true,
        generate: true,
        exclude: [
          '/admin',
          '/vn/date',
          '/login',          
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
          const { data } = await axios.get(`https://vietnambis.com/api/district/list`)
          return data.list.map(url => `/district/${url.slug}-${url.id}`)
        }
      },
      {
        path: '/communes-vn.xml',        
        gzip: true,
        generate: true,
        exclude: [
          '/admin',
          '/vn/date',
          '/login',          
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
          const { data } = await axios.get(`https://vietnambis.com/api/commune/list`)          
          return data.list.map(url => `/vn/xa/${url.slug}-${url.id}`)
        }
      },
      {
        path: '/communes-en.xml',        
        gzip: true,
        generate: true,
        exclude: [
          '/admin',
          '/vn/date',
          '/login',          
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
          const { data } = await axios.get(`https://vietnambis.com/api/commune/list`)
          return data.list.map(url => `/commune/${url.slug}-${url.id}`)
        }
      },
      {
        path: '/industries-vn.xml',        
        gzip: true,
        generate: true,
        exclude: [
          '/admin',
          '/vn/date',
          '/login',          
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
          const { data } = await axios.get(`https://vietnambis.com/api/industry/list`)          
          return data.list.map(url => `/vn/nganh/${url.vnslug}-${url.id}`)
        }
      },
      {
        path: '/industries-en.xml',        
        gzip: true,
        generate: true,
        exclude: [
          '/admin',
          '/vn/date',
          '/login',          
          '/vn/ket-qua',
          '/vn',
          '/search',
          '/index_en',
          '/acontact',
          '/login/**',
          '/admin/**',
          '/post/**',
          '/business/**',
          '/vn/doanh-nghiep/**'
        ],
        routes: async () => {
          const { data } = await axios.get(`https://vietnambis.com/api/industry/list`)
          return data.list.map(url => `/industry/${url.slug}-${url.id}`)
        }
      }
    ]
  },
  // Global CSS
  css: ['~assets/css/main.css', '~assets/skeleton/css/skeleton.css', '~assets/skeleton/css/normalize.css', '~assets/skeleton/css/custom.css'
  ,'~assets/css/ocean.min.css', '~assets/css/yeh-md-theme.css'],

  build: {
    //Add axios globally
    vendor: ['axios','vue-notification'],
    // Run ESLINT on save
    /*extend (config, ctx) {
       if (ctx.isClient) {
         config.module.rules.push({
           enforce: 'pre',
           test: /\.(js|vue)$/,
           loader: 'eslint-loader',
           exclude: /(node_modules)/
         })
       }
     }*/      
     extractCSS: true
//  optimization: {
//   minimizer: [
//    new UglifyJsPlugin({
//     cache: true,
//     parallel: true,
//     sourceMap: false // set to true if you want JS source maps
//    }),
//    new OptimizeCssAssetsPlugin({})
//   ],
//   splitChunks: {
//    cacheGroups: {
//     chunks: 'all',
//     name: false,
//     styles: {
//      name: 'styles',
//      test: /\.(vue)$/,
//      chunks: 'all',
//      enforce: true
//     }
//    }
//   }
//  }
 ,runtimeChunk: true, 
  },
  // Loading effect at the top of the page
  loading: {
    color: '#04acf7',
    height: '4px',
    failedColor: 'red'
  },
  //transition
  transition: {
    name: 'page'
  },
  //Configure routing
  // router: [
  //   {middleware: 'adminAuth'},
  //   {src:'~router/index'}
  // ],  
  router: {
     middleware: 'adminAuth'
    ,
      extendRoutes (routes, resolve) {
         routes.push({            
            name: 'contact',
            path: '/contact/us',
            component: resolve(__dirname, 'pages/acontact/index.vue')
         }),
         routes.push({            
          name: 'lien-he',
          path: '/vn/lien-he',
          meta: {layout: 'vn'},
          component: resolve(__dirname, 'pages/vn/lien-he/index.vue')
       }),         
        routes.push({
          name: 'province',
          path: '/province/:slugid/:id',
          component: resolve(__dirname, 'pages/province/_slugid.vue')
        }),
        routes.push({
          name: 'tinh-thanh',
          path: '/vn/tinh-thanh/:slugid/:id',
          component: resolve(__dirname, 'pages/vn/tinh-thanh/_slugid.vue')
        }),        
        routes.push({
          name: 'district',
          path: '/district/:slugid/:id',
          component: resolve(__dirname, 'pages/district/_slugid.vue')
        }),
        routes.push({
          name: 'quan-huyen',
          path: '/vn/huyen/:slugid/:id',
          component: resolve(__dirname, 'pages/vn/huyen/_slugid.vue')
        }),
        routes.push({
          name: 'commune',
          path: '/commune/:slugid/:id',
          component: resolve(__dirname, 'pages/commune/_slugid.vue')
        }),
        routes.push({
          name: 'xa',
          path: '/vn/xa/:slugid/:id',
          component: resolve(__dirname, 'pages/vn/xa/_slugid.vue')
        }),
        routes.push({
          name: 'ketqua',
          path: '/vn/ket-qua/:keyword/:province/:id',
          component: resolve(__dirname, 'pages/vn/ket-qua/index.vue')
        }),        
        routes.push({
            name: 'ket-qua-ngay-mot',
            path: '/vn/doanh-nghiep/:date',
            component: resolve(__dirname, 'pages/vn/doanh-nghiep/date.vue')
          }),
        routes.push({
          name: 'ket-qua-ngay',
          path: '/vn/doanh-nghiep/:date/:id',
          component: resolve(__dirname, 'pages/vn/doanh-nghiep/date.vue')
        }),
        routes.push({
          name: 'vn-name-result',
          path: '/vn/doanh-nghiep/ten/:name',
          component: resolve(__dirname, 'pages/vn/doanh-nghiep/director.vue')
        }),
        routes.push({
          name: 'vn-tag-quan-huyen-ngay',
          path: '/vn/doanh-nghiep/quan-huyen/:id-:slug/ngay:date',
          component: resolve(__dirname, 'pages/vn/doanh-nghiep/quan-huyen/ngay.vue')
        }),
        routes.push({
          name: 'vn-tag-quan-huyen-ngay-page',
          path: '/vn/doanh-nghiep/quan-huyen/:id-:slug/ngay:date/:page',
          component: resolve(__dirname, 'pages/vn/doanh-nghiep/quan-huyen/ngay.vue')
        }),
        routes.push({
          name: 'vn-tag-quan-huyen-thang',
          path: '/vn/doanh-nghiep/quan-huyen/:id-:slug/thang:date',
          component: resolve(__dirname, 'pages/vn/doanh-nghiep/quan-huyen/thang.vue')
        }),        
        routes.push({
          name: 'vn-name-result-id',
          path: '/vn/doanh-nghiep/ten/:name/:id',
          component: resolve(__dirname, 'pages/vn/doanh-nghiep/director.vue')
        }),
        routes.push({
          name: 'industry',
          path: '/industry/:slugid/:id',
          component: resolve(__dirname, 'pages/industry/_slugid.vue')
        }),
        routes.push({
          name: 'nganh',
          path: '/vn/nganh/:slugid/:id',
          component: resolve(__dirname, 'pages/vn/nganh/_slugid.vue')
        }),
        routes.push({
          name: 'detail',
          path: '/:slugid',
          component: resolve(__dirname, 'pages/_slugid.vue')
        }),
        routes.push({
          name: 'search',
          path: '/search/:keyword/:province/:id',
          component: resolve(__dirname, 'pages/search/index.vue')
        }),        
        routes.push({
          name: 'search-date-id',
          path: '/business/:date/:id',
          component: resolve(__dirname, 'pages/business/date.vue')
        }),
        routes.push({
          name: 'search-representative',
          path: '/business/representative/:name/:id',
          component: resolve(__dirname, 'pages/business/director.vue')
        }),
        routes.push({
          name: 'business',
          path: '/business/:id',
          component: resolve(__dirname, 'pages/business/_id.vue')
        }),
        routes.push({
          name: 'blog',
          path: '/vn/blog/:slug',
          component: resolve(__dirname, 'pages/post/slug.vue')
        })        
      }    
  },  
  plugins: [
    { src: '~plugins/axios' },
    { src: '~plugins/vue-notification', ssr: false },
    // { src: '~plugins/ckeditor', ssr: false },
    { src: '~plugins/ga.js', mode: 'client' }
    //{ src: '~plugins/element-ui' },
    //{ src: '~plugins/components' }
  ],
    hooks: {
      'vue-renderer:ssr:context'(context) {
        const routePath = JSON.stringify(context.nuxt.routePath);
        context.nuxt = {serverRendered: true, routePath};
      }
    }
}
