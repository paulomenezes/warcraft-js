function Tile (tileX, tileY, textureX, textureY) {
	this.width = 32;
	this.height = 32;

	this.position = {
		x: tileX * 32,
		y: tileY * 32
	};

	this.tilePosition = {
		x: tileX,
		y: tileY
	};

	this.textureOffset = {
		x: textureX * 33,
		y: textureY * 33
	};
}

Tile.prototype.loadContent = function(Image) {
	this.texture = new Image();
	this.texture.src = './images/tiles.png';
};

Tile.prototype.draw = function() {
	global.context.drawImage(
		this.texture, 
		this.textureOffset.x, this.textureOffset.y, 
		this.width, this.height, 
		this.position.x, this.position.y, 
		this.width, this.height);
};

module.exports = Tile;