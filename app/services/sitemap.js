var format = require('util').format;

module.exports = function(app) {

    var DOMAIN = 'http://vistaentrada.com';
    var LINKS = [
        '/',
        '/disclaimer',
        '/contact',
        '/guidelines-covenants',
        '/maps',
        '/price-list',
        '/other-properties',
        '/links'
    ];

    return {
        generate: function(done) {
            app.services.gsheet.getLots(function(err, lots) {
                if(err) return done(err, null)

                var links = LINKS.
                    concat(lots.map(function(lot) {
                        return format('/lot/%s/%s', lot.block, lot.number);
                    }))
                    .map(function(link) {
                        return DOMAIN + link
                    });
                done(null, links.join('\n'))
            });
        }
    }
};
