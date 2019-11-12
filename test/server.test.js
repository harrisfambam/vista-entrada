var app = require('../app')(__dirname+'/../'),
    request = require('supertest');

describe('server routes', function() {

    var pages = [
        '/',
        '/contact',
        '/disclaimer',
        '/maps',
        '/price-list',
        '/disclaimer',
        '/guidelines-covenants',
        '/links',
        '/other-properties'
    ];

    pages.forEach(function(route) {
        it('should load the page: ' + route, function(done) {
            request(app.http)
                .get(route)
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
        });
    });

});
