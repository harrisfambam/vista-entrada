var path = require("path"),
  Crampon = require("crampon");

module.exports = function(app) {
  var environment = process.env.NODE_ENV || "development",
    assetManifest = require("./asset-manifest")(app),
    lots = require("./lots"),
    crampon = new Crampon(["production", "test", "development"])
      .addFile(path.join(__dirname, "config.js"))
      .addOverride({ assets: { manifest: assetManifest } })
      .addOverride({ environment: environment })
      .addOverride({ lots: lots() });

  app.config = crampon.getConfig(environment);
};
