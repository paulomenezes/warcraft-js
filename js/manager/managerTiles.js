var Tile = global.Load('./map/tile');

function ManagerTiles () {
	this.layerOne = [];
	this.layerTwo = [];
	this.collision = [];

	this.lengthX = 700 / 32;
	this.lengthY = 500 / 32;

	for (var i = 0; i < this.lengthX; i++) {
		for (var j = 0; j < this.lengthY; j++) {
			this.layerOne.push(new Tile(i, j, 3, 14));
		};
	};

	for (var i = 0; i < 8; i++) {
		this.layerTwo.push(new Tile(5, i, 2, 1));
	};

	for (var i = 0; i < 9; i++) {
		this.layerTwo.push(new Tile(8, i + 7, 2, 1));
	};

	for (var i = 0; i < 10; i++) {
		this.layerTwo.push(new Tile(12, i, 2, 1));
	};
}

ManagerTiles.prototype.loadContent = function(Image) {
	this.layerOne.forEach(function (item) {
		item.loadContent(Image);
	});
	this.layerTwo.forEach(function (item) {
		item.loadContent(Image);
	});
};

ManagerTiles.prototype.draw = function() {
	this.layerOne.forEach(function (item) {
		item.draw();
	});
	this.layerTwo.forEach(function (item) {
		item.draw();
	});
};

module.exports = ManagerTiles;