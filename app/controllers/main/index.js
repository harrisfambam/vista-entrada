
module.exports = function(app) {

    app.http.get('/', function(req, res) {
        res.render('index');
    });

    app.http.get('/sitemap.txt', function(req, res) {
        app.services.sitemap.generate(function(err, sitemap) {
            res.setHeader('Content-Type', 'text/plain')
            res.send(sitemap)
        });
    });

    app.http.get('/contact', function(req, res) {
        res.render('contact');
    });

    app.http.get('/disclaimer', function(req, res) {
        res.render('disclaimer');
    });

    app.http.get('/maps', function(req, res) {
        app.services.gsheet.getLots(function(err, lots) {
            lots = lots.filter(function(lot) {
                return (lot.price||'').toUpperCase() !== 'SOLD';
            });

            res.render('maps', {
                lots: lots
            });
        });
    });

    app.http.get('/price-list', function(req, res) {
        app.services.gsheet.getLots(function(err, lots) {
            res.render('price-list', {
                list: lots
            });
        });
    });

    app.http.get('/disclaimer', function(req, res) {
        res.render('disclaimer');
    });

    app.http.get('/guidelines-covenants', function(req, res) {
        res.render('guidelines-covenants');
    });

    app.http.get('/links', function(req, res) {
        res.render('links');
    });

    app.http.get('/other-properties', function(req, res) {
        app.services.gsheet.getOtherProperties(function(err, properties) {
            res.render('other-properties', {
                properties: properties
            });
        });
    });

    app.http.get('/lot/:block/:number', function(req, res, next) {
        var block = req.params.block,
            number = req.params.number;

        app.services.gsheet.getLots(function(err, lots) {
            var lot = lots.filter(function(lot) {
                return lot.block == block && lot.number == number;
            })[0];

            if(!lot) return res.status(404).send('not found');

            res.render('lot', {
                lot: lot
            });
        });
    });

};
