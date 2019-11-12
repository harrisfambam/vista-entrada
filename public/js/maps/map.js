/* global google */
module.exports = function (container) {
  return new google.maps.Map(
    container,
    {
      zoom: 15,
      center: new google.maps.LatLng(35.312023, -106.602599)
    }
  )
}
