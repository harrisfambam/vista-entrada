var GoogleSpreadsheet = require("google-spreadsheet"),
    Cashbox = require('cashbox');

module.exports = function(app) {
    var LOTS_TTL = '15 minutes',
        PROPS_TTL = '15 minutes',
        LAST_LOTS = [],
        LAST_PROPS = [],
        config = app.config.spreadsheet,
        sheet = new GoogleSpreadsheet(config.id),
        cache = new Cashbox();

    return {

        getLots: function(done) {
            cache.get('lots', function loadLots(key, callback) {
                console.log('loading lots from google...');
                sheet.getRows(config.lotsWorksheet, function(err, rows){
                    // Treat errors by sending the last good set of lot data
                    if(err) {
                        console.error(err);
                        return callback(null, LAST_LOTS);
                    }

                    // If our data is empty for some reason, send the last good set
                    if(!rows || !rows.length) {
                        return callback(null, LAST_LOTS);
                    }

                    var lots = rows.map(function(row) {
                      return {
                          block: (row.block||'').trim(),
                          number: (row.number||'').trim(),
                          size: Number(row.size),
                          longitude: (row.longitude||'').trim(),
                          latitude: (row.latitude||'').trim(),
                          price: (row.price||'-').trim(),
                          sortPrice: getSortPrice((row.price||'').trim())
                      };
                    });

                    // Keep a local ref of last good set of lot data
                    LAST_LOTS = lots;

                    callback(null, lots);
                });

            }, LOTS_TTL, done);
        },

        getOtherProperties: function(done) {
            cache.get('other-properties', function loadLots(key, callback) {
                console.log('loading props from google...');
                sheet.getRows(config.otherPropertiesWorksheet, function(err, rows){
                    // Treat errors by sending the last good set of lot data
                    if(err) {
                        console.error(err);
                        return callback(null, LAST_PROPS);
                    }

                    // If our data is empty for some reason, send the last good set
                    if(!rows || !rows.length) {
                        return callback(null, LAST_PROPS);
                    }

                    var props = rows.map(function(row) {
                      return {
                          unit: (row.unit||'').trim(),
                          block: (row.block||'').trim(),
                          lot: (row.lot||'').trim(),
                          street: (row.street||'').trim(),
                          size: Number(row.size),
                          price: (row.price||'-').trim()
                      };
                    });

                    // Keep a local ref of last good set of lot data
                    LAST_PROPS = props;

                    callback(null, props);
                });

            }, PROPS_TTL, done);
        }

    };
};

function getSortPrice(val) {
    if(!val) val = 0;

    if(val == 'SOLD') val = 1;

    return val;
}
