import type { Config } from "tailwindcss";
// import plugin from "tailwindcss/plugin";

// import twColors from "tailwindcss/colors";
import twTypography from "@tailwindcss/typography";
import twAspectRatio from "@tailwindcss/aspect-ratio";
import twContainer from "@tailwindcss/container-queries";

// import defaultTheme from "tailwindcss/defaultTheme";

// # full config
// # https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
export default <Partial<Config>>{
  content: [
    "../pages/**/*.{vue,js,ts,tsx}",
    "../components/**/*.{vue,js,ts,tsx}",
    "../plugins/**/*.{js,ts}",
    "../layouts/**/*.{vue,js,ts,tsx}",
    "../composables/**/*.{js,ts}",
    "../utils/**/*.{js,ts}",
    "../app.{vue,js,ts,tsx}",
    "../App.{vue,js,ts,tsx}",
    "../error.{vue,js,ts,tsx}",
    "../Error.{vue,js,ts,tsx}",
    "../static/**/*.html",
    "../content/**/*.md",
    "../docs/**/*.html",
    "../app/**/*.html",
    "../nuxt.config.{js,ts}",
    "../app.config.{js,ts}",
    // { raw: "<import content...>", extension: "html" },
  ],
  // generate classes
  safelist: [
    // "safelisted",
    // {
    //   pattern: /bg-(red|green|blue)-(100|200|300)/,
    //   variants: ['lg', 'hover', 'focus', 'lg:hover'],
    // },
  ],
  // discard classes
  blocklist: [],
  // darkMode: "class",
  theme: {
    extend: {
      // #https://tailwindcss.com/docs/customizing-colors
      colors: {
        // primary: "colors.indigo",
        // secondary: "colors.yellow",
        // neutral: "colors.gray",
        current: "currentColor",
        transparent: "transparent",
      },
      screens: {
        // 'sm': '640px',
        // 'md': '768px',
        // 'lg': "1024px",
        // 'xl': '1280px',
        // '2xl': '1536px',
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
        tall: { raw: "(min-height: 792px)" },
      },
      // fontFamily: {
      //   sans: ["Poppins", "sans-serif"],
      // },
      // spacing: {},
      // borderRadius: {},
      containers: {
        "2xs": "16rem",
      },
    },
  },
  //
  corePlugins: {
    // # disable the aspectRatio core plugin to avoid conflicts
    // # with the native aspect-ratio utilities
    aspectRatio: false,
  },
  plugins: [
    // // require("@tailwindcss/typography"),
    // // require("@tailwindcss/aspect-ratio"),
    // // require("@tailwindcss/line-clamp"),
    // // require("@tailwindcss/forms"),
    twTypography,
    // @https://github.com/tailwindlabs/tailwindcss-aspect-ratio?tab=readme-ov-file#usage
    twAspectRatio,
    // @https://github.com/tailwindlabs/tailwindcss-container-queries?tab=readme-ov-file#usage
    twContainer,
  ],
  // presets: [],
};
