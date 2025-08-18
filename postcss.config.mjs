const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "autoprefixer": {},
    "cssnano": process.env.NODE_ENV === "production" ? {
      preset: ["default", {
        discardComments: { removeAll: true },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifySelectors: true,
        mergeLonghand: true,
        mergeRules: true,
        minifyGradients: true,
        minifyParams: true,
        minifyTimingFunctions: true,
        reduceIdents: true,
        reduceInitial: true,
        reduceTransforms: true,
        zindex: false
      }]
    } : false
  },
};

export default config;
