var Map = require('./maps/map.js')
var Lots = require('./maps/lots.js')

module.exports = function (data) {
  var map = Map(document.getElementById('map-canvas'))

  Lots(data.lots, map)
}
