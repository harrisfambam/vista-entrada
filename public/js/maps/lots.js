var infoTemplate = require('./marker.jade')

/* global google */
module.exports = function (lots, map) {
  var openInfo

    // add markers for all the lots
  (lots || []).forEach(function (lot) {
    var marker = new google.maps.Marker({
      map: map,
      title: 'Lot #' + lot.number,
      position: new google.maps.LatLng(lot.longitude, lot.latitude),
      animation: google.maps.Animation.DROP
    })

    var info = new google.maps.InfoWindow({
      content: infoTemplate({ lot: lot })
    })

    google.maps.event.addListener(marker, 'click', function () {
      if (openInfo) openInfo.close()

      info.open(map, marker)
      openInfo = info
    })
  })
}
