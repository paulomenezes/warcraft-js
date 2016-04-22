var MapObject = global.Load('./map/mapObject');

function Building (name, data, managerTiles, tileX, tileY) {
	this.id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	this.data = data;
	console.log(this.data);
	this.hitPoints = this.data.statistics.hitPoints;

	tileX = (tileX - (this.data.size.width / 2)) / 32;
	tileY = (tileY - (this.data.size.height / 2)) / 32;

	var self = this;
	this.mapObject = new MapObject(managerTiles, tileX, tileY, this.data, function (selected) {
		if (selected) {
			console.log('building selected');
		} else {
			console.log('building deselected');
		}
	});
}

Building.prototype.loadContent = function(Image) {
	this.mapObject.loadContent(Image);
};

Building.prototype.update = function() {
	this.mapObject.update();
};

Building.prototype.draw = function() {
	this.mapObject.draw();
};

module.exports = Building;