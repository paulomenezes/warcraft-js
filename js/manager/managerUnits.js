var TeamUnits = global.Load('./common/teamUnits');
var MapObject = global.Load('./map/mapObject');

function ManagerUnits (managerTiles) {
	var objects = [];

	for (var i = 6; i < 9; i++) {
		objects.push(new MapObject(managerTiles, 4, i));
	};
	for (var i = 10; i < 14; i++) {
		objects.push(new MapObject(managerTiles, 10, i));
	};
	
	this.teams = [];
	this.teams.push(new TeamUnits(objects, 'player', []));
}

ManagerUnits.prototype.loadContent = function(Image) {
	this.teams.forEach(function (item) {
		item.loadContent(Image);
	});
};

ManagerUnits.prototype.update = function() {
	this.teams.forEach(function (item) {
		item.update();
	});
};

ManagerUnits.prototype.draw = function() {
	this.teams.forEach(function (item) {
		item.draw();
	});
};

module.exports = ManagerUnits;