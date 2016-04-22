var Unit = global.Load('./models/units/unit');

function ManagerUnits (managerTiles) {
	this.units = [];

	for (var i = 6; i < 9; i++) {
		this.units.push(new Unit('peasant', managerTiles, 4, i));
	};
	for (var i = 10; i < 14; i++) {
		this.units.push(new Unit('peasant', managerTiles, 10, i));
	};
}

ManagerUnits.prototype.loadContent = function(Image) {
	this.units.forEach(function (item) {
		item.loadContent(Image);
	});
};

ManagerUnits.prototype.update = function() {
	this.units.forEach(function (item) {
		item.update();
	});
};

ManagerUnits.prototype.draw = function() {
	this.units.forEach(function (item) {
		item.draw();
	});
};

module.exports = ManagerUnits;