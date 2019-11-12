module.exports = {
  production: {
    logHttp: "short",
    tracking: true,
    port: process.env.PORT || 8080,
    spreadsheet: {
      id: process.env.SPREADSHEET_ID,
      lotsWorksheet: 1,
      otherPropertiesWorksheet: 2
    },
    assets: {
      root: "/assets/",
      // root: 'https://d3lvc3xjxixbeb.cloudfront.net/',
      dirs: ["public_dist"],
      maxAge: 31536000000, // one year
      versioned: true,
      debug: false,
      dynamic: false
    },
    keywords: [
      "real estate",
      "real estate for sale",
      "real estate listings",
      "lots",
      "lots for sale",
      "new mexico real estate",
      "rio rancho real estate",
      "albuquerque real estate",
      "vista entrada"
    ]
  },

  development: {
    logHttp: "dev",
    tracking: false
    // assets: {
    //   root: '/',
    //   dirs: ['public_dist_versioned', 'public'],
    //   debug: true,
    //   maxAge: 0,
    //   dynamic: false
    // }
  }
};
