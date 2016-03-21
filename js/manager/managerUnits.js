var TeamUnits = global.Load('./common/teamUnits');
var MapObject = global.Load('./map/mapObject');

function ManagerUnits (managerTiles) {
	var objects = [];

	objects.push(new MapObject(managerTiles, 4, 6));
	objects.push(new MapObject(managerTiles, 4, 7));
	objects.push(new MapObject(managerTiles, 4, 8));
	objects.push(new MapObject(managerTiles, 4, 9));

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