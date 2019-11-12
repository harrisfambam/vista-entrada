
// Attach services to app
module.exports = function(app) {
  app.services = {

      gsheet: require('./gsheet')(app),

      sitemap: require('./sitemap')(app)

  };

  return app;
};
