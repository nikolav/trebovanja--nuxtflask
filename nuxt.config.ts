import vitePluginVuetify, { transformAssetUrls } from "vite-plugin-vuetify";

import { API_URL, SSR, BASE_DIR, ENDPOINT_GRAPHQL } from "./config";
import { trimEndBase } from "./utils/trim-end-base";

type TMeta = Record<string, string>[];

const meta: TMeta = [
  { name: "description", content: "NuxtApp --nuxt.config" },
  { name: "theme-color", content: "#fafafa" },
];
//
// @@https --force
// <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
//
if (API_URL.startsWith("https"))
  meta.push({
    "http-equiv": "Content-Security-Policy",
    content: "upgrade-insecure-requests",
  });
//

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // # client-side rendering;
  //  prerender    .true
  //  no-prerender .false
  // ssr: SSR,

  routeRules: {
    //   // Generated at build time for SEO purpose
    //   // "/": { prerender: true },
    // "/aktiva/proizvodi/**": { swr: true },
    // "/aktiva/proizvodi/1": { prerender: true },
    // "/aktiva/proizvodi/2": { prerender: true },
    // "/aktiva/proizvodi/4": { prerender: true },
    // "/aktiva/proizvodi/6": { prerender: true },
    // "/aktiva/proizvodi/7": { prerender: true },
    // "/aktiva/proizvodi/8": { prerender: true },
    // "/aktiva/proizvodi/9": { prerender: true },
    // "/aktiva/proizvodi/10": { prerender: true },
    // "/aktiva/proizvodi/*": { prerender: true },
    //   // Cached for 1 hour
    //   // "/api/*": { cache: { maxAge: 60 * 60 } },
    //   // Redirection to avoid 404
    //   // "/old-page": {
    //   //   redirect: { to: "/new-page", statusCode: 302 },
    //   // },
    // Set prerender to true to configure it to be prerendered
    // "/rss.xml": { prerender: true },
    // Set it to false to configure it to be skipped for prerendering
    // "/this-DOES-NOT-get-prerendered": { prerender: false },
    // Everything under /blog gets prerendered as long as it
    // is linked to from another page
    // "/blog/**": { prerender: true },
    //   // ...
  },

  // #Selective Pre-rendering @nitro
  // #https://nuxt.com/docs/getting-started/prerendering#selective-pre-rendering
  // nitro: {
  //   prerender: {
  //     // routes: ['/user/1', '/user/2'],
  //     // ignore: ["/dynamic"],
  //   },
  // },

  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      // fooBar: process.env.var
    },
  },

  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  ssr: SSR,

  app: {
    ...(BASE_DIR
      ? {
          baseURL: BASE_DIR,
          buildAssetsDir: `${trimEndBase(BASE_DIR, "/")}/_nuxt/`,
        }
      : {}),

    //
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "app",
      // titleTemplate: "%s | tereni:frikom",
      // https://www.geeksforgeeks.org/meta-tags-in-nuxt-js/
      meta,
      //
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
      ],
      bodyAttrs: {
        //  class: "dark:selection:bg-white/20 scrollbar-thin-light",
      },
      // noscript: [{ children: "JavaScript is required" }],
    },
    // transition pages
    pageTransition: { name: "BLUR", mode: "in-out" },
    // transition layouts
    layoutTransition: { name: "BLUR" },
  },

  css: [
    // global, main
    "~/assets/styles/main.scss",

    // https://animate.style/
    "animate.css",

    // vuetify
    "@mdi/font/css/materialdesignicons.css",
    "vuetify/lib/styles/main.sass",

    // lightbox
    "@fancyapps/ui/dist/fancybox/fancybox.css",

    // toasts
    // "~/assets/styles/toasts.scss",
  ],

  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss", // https://pinia.vuejs.org/
    "@pinia/nuxt", // https://vueuse.org/
    "@vueuse/nuxt", // https://apollo.nuxtjs.org/getting-started/quick-start
    "@nuxtjs/apollo",
    "@nuxt/icon",
    async (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(
          vitePluginVuetify({
            autoImport: true,
            styles: {
              configFile: "assets/styles/vuetify/settings.scss",
            },
          })
        );
      });
    },
    "@nuxtjs/color-mode",
    "@nuxt/image",
  ],

  build: {
    transpile: ["vuetify"],
    // rollupOptions: {
    //   external: [
    //     /^@vue\/apollo-composable/,
    //     // /^node:.*/,
    //   ],
    // },
  },

  // access style config in preprocessed files
  //   sass, variables, partials, etc.
  //  https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/globals.scss" as *;',
        },
      },
    },
    define: {
      "process.env.DEBUG": false,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  hooks: {
    // "pages:extend"
    // "render:html"
    //   // # append dirs, extending default path
    //   // "components:dirs": (dirs) => {
    //   //   dirs.push({
    //   //     path: "/path",
    //   //     prefix: "App",
    //   //   });
    // async "prerender:routes"(ctx) {
    //   const { pages } = await fetch("https://api.some-cms.com/pages").then(
    //     (res) => res.json()
    //   );
    //   for (const page of pages) {
    //     ctx.routes.add(`/${page.name}`);
    //   }
    // },
  },

  // include auto import dirs
  //  OVERRIDING default path
  // components: [
  //   // {
  //   //   path: "/path",
  //   //   prefix: "App",
  //   // },
  // ],

  imports: {
    // @unimport
    // #disable auto-imports; use explicit imports from #imports
    // autoImport: false

    dirs: ["./keys"],
    presets: [
      {
        from: "lodash/get",
        imports: [
          {
            name: "default",
            as: "get",
          },
        ],
      },
      {
        from: "lodash/get",
        imports: [
          {
            name: "default",
            as: "getPath",
          },
        ],
      },
      {
        from: "lodash/identity",
        imports: [{ name: "default", as: "identity" }],
      },
      {
        from: "lodash/range",
        imports: [{ name: "default", as: "range" }],
      },
      {
        from: "lodash/pullAll",
        imports: [{ name: "default", as: "pullAll" }],
      },
      {
        from: "lodash/size",
        imports: [{ name: "default", as: "len" }],
      },
      {
        from: "lodash/isEmpty",
        imports: [{ name: "default", as: "isEmpty" }],
      },
      {
        from: "lodash/first",
        imports: [{ name: "default", as: "first" }],
      },
      {
        from: "lodash/every",
        imports: [{ name: "default", as: "every" }],
      },
      {
        from: "lodash/differenceBy",
        imports: [{ name: "default", as: "differenceBy" }],
      },
      {
        from: "lodash/union",
        imports: [{ name: "default", as: "union" }],
      },
      {
        from: "lodash/sortBy",
        imports: [{ name: "default", as: "sortBy" }],
      },
      {
        from: "lodash/once",
        imports: [{ name: "default", as: "once" }],
      },
      {
        from: "lodash/difference",
        imports: [{ name: "default", as: "difference" }],
      },
      {
        from: "lodash/sampleSize",
        imports: [{ name: "default", as: "sampleSize" }],
      },
      {
        from: "lodash/findKey",
        imports: [{ name: "default", as: "findKey" }],
      },
      {
        from: "lodash/find",
        imports: [{ name: "default", as: "find" }],
      },
      {
        from: "lodash/unset",
        imports: [{ name: "default", as: "unset" }],
      },
      {
        from: "lodash/each",
        imports: [{ name: "default", as: "each" }],
      },
      {
        from: "lodash/cloneDeep",
        imports: [{ name: "default", as: "cloneDeep" }],
      },
      // {
      //   from: "lodash/clone",
      //   imports: [{ name: "default", as: "clone" }],
      // },
      {
        from: "lodash/isString",
        imports: [{ name: "default", as: "isString" }],
      },
      {
        from: "lodash/has",
        imports: [{ name: "default", as: "has" }],
      },
      {
        from: "lodash/has",
        imports: [{ name: "default", as: "hasPath" }],
      },
      {
        from: "lodash/pick",
        imports: [{ name: "default", as: "pick" }],
      },
      {
        from: "lodash/omit",
        imports: [{ name: "default", as: "omit" }],
      },
      {
        from: "lodash/keys",
        imports: [{ name: "default", as: "keys" }],
      },
      // {
      //   from: "lodash/isEqual",
      //   imports: [{ name: "default", as: "isEqual" }],
      // },
      {
        from: "lodash/sample",
        imports: [{ name: "default", as: "sample" }],
      },
      {
        from: "lodash/take",
        imports: [{ name: "default", as: "take" }],
      },
      {
        from: "lodash/takeRight",
        imports: [{ name: "default", as: "takeRight" }],
      },
      {
        from: "lodash/debounce",
        imports: [{ name: "default", as: "debounce" }],
      },
      {
        from: "lodash/startCase",
        imports: [{ name: "default", as: "startCase" }],
      },
      {
        from: "lodash/lowerCase",
        imports: [{ name: "default", as: "lowerCase" }],
      },
      {
        from: "lodash/upperCase",
        imports: [{ name: "default", as: "upperCase" }],
      },
      {
        from: "lodash/camelCase",
        imports: [{ name: "default", as: "camelCase" }],
      },
      {
        from: "lodash/kebabCase",
        imports: [{ name: "default", as: "kebabCase" }],
      },
      {
        from: "lodash/snakeCase",
        imports: [{ name: "default", as: "snakeCase" }],
      },
      {
        from: "lodash/set",
        imports: [{ name: "default", as: "set" }],
      },
      {
        from: "lodash/clamp",
        imports: [{ name: "default", as: "clamp" }],
      },
      {
        from: "lodash/uniqueId",
        imports: [{ name: "default", as: "uniqueId" }],
      },
      {
        from: "lodash/assign",
        imports: [{ name: "default", as: "assign" }],
      },
      {
        from: "lodash/some",
        imports: [{ name: "default", as: "some" }],
      },
      {
        from: "lodash/trimEnd",
        imports: [{ name: "default", as: "trimEnd" }],
      },
      {
        from: "lodash/trim",
        imports: [{ name: "default", as: "trim" }],
      },
      {
        from: "lodash/noop",
        imports: [{ name: "default", as: "noop" }],
      },
      {
        from: "lodash/transform",
        imports: [{ name: "default", as: "transform" }],
      },
      {
        from: "lodash/map",
        imports: [{ name: "default", as: "map" }],
      },
      {
        from: "lodash/filter",
        imports: [{ name: "default", as: "filter" }],
      },
      {
        from: "lodash/reduce",
        imports: [{ name: "default", as: "reduce" }],
      },
      {
        from: "validator/lib/isEmail",
        imports: [{ name: "default", as: "isEmail" }],
      },
      {
        from: "validator/lib/isMobilePhone",
        imports: [{ name: "default", as: "isMobilePhone" }],
      },
      {
        from: "validator/lib/isURL",
        imports: [{ name: "default", as: "isURL" }],
      },
      {
        from: "uuid",
        imports: [{ name: "v4", as: "uuid" }],
      },
    ],
  },

  // #https://google-fonts.nuxtjs.org
  googleFonts: {
    families: {
      "Open+Sans": {
        wght: [100, 300, 400, 500, 700, 900],
        ital: [100, 300, 400, 500, 700, 900],
      },
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
        ital: [100, 300, 400, 500, 700, 900],
      },
    },
    useStylesheet: true,
    download: false,
  },

  tailwindcss: {
    cssPath: "~/assets/tailwind.css",
    configPath: "~/config/tailwind.config.ts",
    // # Import fully resolved config
    // # import tailwindConfig from '#tailwind-config'
    exposeConfig: true,
    // # Extend the Tailwind config
    // config: {},
    // injectPosition: 0,
    viewer: false,
  },

  // https://apollo.nuxtjs.org/getting-started/configuration#configuration
  // https://apollo.nuxtjs.org/getting-started/configuration#clients
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: ENDPOINT_GRAPHQL,
        httpLinkOptions: {
          // Enable sending cookies over cross-origin requests
          credentials: "include",
        },
        tokenName: "@apollo/token:HoARGKAyE7VRBupLHJ",
      },
    },
  },

  // recommended to install the icon data locally with
  // npm i -D @iconify-json/collection-name
  icon: {
    // serverBundle: {
    //   collections: ["uil", "mdi"],
    // },
    // componentName: "NuxtIcon",
    // #https://github.com/nuxt/icon?tab=readme-ov-file#custom-local-collections
    // provider: SSR ? undefined : "server",
    // provider: "server",
    customCollections: [
      {
        prefix: "local",
        dir: "./assets/icons-local",
      },
    ],
  },

  colorMode: {
    // preference: "system", // default value of $colorMode.preference
    // fallback: "light", // fallback value if not system preference found
    // hid: "nuxt-color-mode-script",
    // globalName: "__NUXT_COLOR_MODE__",
    // componentName: "ColorScheme",
    // classPrefix: "",
    classSuffix: "",
    // storageKey: "nuxt-color-mode",
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  experimental: {
    scanPageMeta: true,
    // typedPages: true,
    // inlineRouteRules: true,
  },

  // https://image.nuxt.com/get-started/configuration
  image: {
    // # can override at the component level
    // quality: 80,
    // # globally initialize an $img helper
    // inject: true,
    // format: ["webp"],
    // #allow domains to be optimized
    domains: [
      // 🏠
      // "frikom.nikolav.rs",
    ],
    //
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
});
