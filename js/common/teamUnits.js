function TeamUnits (units, teamName, allies) {
	this.units = units;
	this.teamName = teamName;
	this.allies = allies;	
}

TeamUnits.prototype.loadContent = function(Image) {
	this.units.forEach(function (item) {
		item.loadContent(Image);
	});
};

TeamUnits.prototype.update = function() {
	this.units.forEach(function (item) {
		item.update();
	});
};

TeamUnits.prototype.draw = function() {
	this.units.forEach(function (item) {
		item.draw();
	});
};

module.exports = TeamUnits;