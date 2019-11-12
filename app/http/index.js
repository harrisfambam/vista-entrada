var path = require("path"),
  express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  compression = require("compression"),
  device = require("express-device"),
  redirectWWW = require("./redirect-www");

module.exports = function(app) {
  var http = (app.http = express());

  http.disable("x-powered-by");
  http.set("env", app.config.environment);
  http.set("view engine", "pug");
  http.set("views", path.join(app.ROOT, "app", "views"));

  http.engine("pug", require("pug").__express);

  // asset url helper
  http.locals.url = require("./urls")(app);
  http.locals.tracking = app.config.tracking;
  http.locals.keywords = app.config.keywords;

  //   http.use(redirectWWW);
  http.use(compression());
  http.use(cors());

  // static middleware - can be multiple dirs
  app.config.assets.dirs.forEach(function(dir) {
    http.use(
      app.config.assets.root,
      express.static(path.join(app.ROOT, dir), {
        maxAge: app.config.assets.maxAge
      })
    );
  });

  if (app.config.logHttp) {
    http.use(morgan(app.config.logHttp));
  }

  http.use(device.capture());
  http.use(function(req, res, next) {
    res.locals.device = req.device.type;
    next();
  });
  http.use(function(req, res, next) {
    res.locals.canonicalPath = req.path;
    next();
  });
};
