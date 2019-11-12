
module.exports = function() {
	var lots = []
		.concat(require('./093.js'))
		.concat(require('./094.js'))
		.concat(require('./095.js'))
		.concat(require('./096.js'))
		.concat(require('./098.js'))
		.concat(require('./099.js'))
		.concat(require('./100.js'))
		.concat(require('./101.js'))
		.concat(require('./102.js'))
		.concat(require('./103.js'))
		.concat(require('./104.js'))
		.concat(require('./105.js'))
		.concat(require('./106.js'))
		.concat(require('./107.js'))
		.concat(require('./113.js'));

	lots.forEach(function(lot){
		lot.sortPrice = getSortPrice(lot.price);
		lot.price = lot.price||'-';
	});

	return lots;
};

function getSortPrice(val) {
	if(!val) val = 0;

	if(val == 'SOLD') val = 1;

	return val;
}
