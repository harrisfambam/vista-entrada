var app = require("./app")(__dirname);

app.http.listen(app.config.port, function(err) {
  if (err) return console.log("Error starting server: ", err.toString());

  console.log("Server started: http://localhost:%s", app.config.port);
});

module.exports = app.http;
