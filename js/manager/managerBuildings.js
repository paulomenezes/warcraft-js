var Building = global.Load('./models/buildings/building');
var image = null;

function ManagerBuildings (managerTiles) {
	this.buildings = [];

	var self = this;
	global.events.on('builder', function (data, position) {
		self.buildings.push(new Building(data.name, data, managerTiles, position.x, position.y));
		self.loadContent(image);
	});
}

ManagerBuildings.prototype.loadContent = function(Image) {
	image = Image;

	this.buildings.forEach(function (item) {
		item.loadContent(Image);
	});
};

ManagerBuildings.prototype.update = function() {
	this.buildings.forEach(function (item) {
		item.update();
	});
};

ManagerBuildings.prototype.draw = function() {
	this.buildings.forEach(function (item) {
		item.draw();
	});
};

module.exports = ManagerBuildings;