var EventEmitter = require('events').EventEmitter;

module.exports = function(ROOT) {

    var app = new EventEmitter();

    app.ROOT = ROOT;

    require('./config')(app);
    require('./services')(app);
    require('./http')(app);
    require('./controllers')(app);

    return app;
};
