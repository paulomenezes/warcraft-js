var MapObject = global.Load('./map/mapObject');
var Builder = global.Load('./commands/builder');

function Unit (name, managerTiles, tileX, tileY) {
	this.id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	this.data = global.Require('./js/data/' + name + '.json');
	this.hitPoints = this.data.statistics.hitPoints;

	this.builder = new Builder();

	var self = this;
	this.mapObject = new MapObject(managerTiles, tileX, tileY, this.data, function (selected) {
		if (selected) {
			global.events.emit('showUI', self);
		} else {
			global.events.emit('hideUI', self.id);
		}
	});
}

Unit.prototype.executeCommand = function(name) {
	if (name === 'builder') {
		global.events.emit('showOptions', this.data.builder);
	} else if (name === 'townHall') {
		this.builder.execute(name, this);
	}
};

Unit.prototype.loadContent = function(Image) {
	this.builder.loadContent(Image);
	this.mapObject.loadContent(Image);
};

Unit.prototype.update = function() {
	this.builder.update();
	this.mapObject.update();
};

Unit.prototype.draw = function() {
	this.mapObject.draw();
	this.builder.draw();
};

module.exports = Unit;