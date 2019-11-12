var Tablesort = global.Tablesort = window.Tablesort = require('./vendor/tablesort.new.min.js')
// Adds numerical sorting
require('./vendor/tablesort.number.min.js')
var $ = require('jquery')

Tablesort($('table.sortable')[0])
