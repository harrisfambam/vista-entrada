var Lots = require('./maps/lots')

/* global google */
module.exports = function (data) {
  var lot = data.lot

  var map = new google.maps.Map(
    document.getElementById('map-canvas'),
    {
      zoom: 18,
      mapTypeId: 'satellite',
      center: new google.maps.LatLng(lot.longitude, lot.latitude)
    }
  )

  Lots([lot], map)
}
