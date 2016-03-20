function Sprite (xTilePos, yTilePos) {
	this.width = 32;
	this.height = 32;

	this.transitionOn = false;

	this.speed = 0;

	this.tilePosition = {
		x: xTilePos,
		y: yTilePos
	};

	this.wantedPos = {
		x: xTilePos,
		y: yTilePos
	};

	this.position = {
		x: this.tilePosition.x * 32,
		y: this.tilePosition.y * 32
	};

	this.rectangle = {
		x: this.position.x,
		y: this.position.y,
		width: this.width,
		height: this.height
	};
}

Sprite.prototype.loadContent = function (Image) {
	this.texture = new Image();
	this.texture.src = './images/worker.png';
};

Sprite.prototype.update = function () {
	if (this.transitionOn) {
		this.updateTransition();
	}
};

Sprite.prototype.move = function (x, y, speed) {
	this.wantedPos.x = this.tilePosition.x + x;
	this.wantedPos.y = this.tilePosition.y + y;

	this.transitionOn = true;

	this.speed = speed;
}

Sprite.prototype.draw = function () {
	global.context.drawImage(
		this.texture, 
		0, 0, 
		this.width, this.height, 
		this.position.x, this.position.y, 
		this.width, this.height);
};

Sprite.prototype.updateTransition = function () {
	if (this.wantedPos.x < this.tilePosition.x) {
		this.position.x -= this.speed;

		if ((this.position.x - this.wantedPos.x * this.width) == 0) 
			this.tilePosition.x--;
	} else if (this.wantedPos.x > this.tilePosition.x) {
		this.position.x += this.speed;

		if ((this.position.x - this.wantedPos.x * this.width) == 0) 
			this.tilePosition.x++;
	} else if (this.wantedPos.y < this.tilePosition.y) {
		this.position.y -= this.speed;

		if ((this.position.y - this.wantedPos.y * this.height) == 0) 
			this.tilePosition.y--;
	} else if (this.wantedPos.y > this.tilePosition.y) {
		this.position.y += this.speed;

		if ((this.position.y - this.wantedPos.y * this.height) == 0) 
			this.tilePosition.y++;
	} else {
		this.transitionOn = false;
	}

	this.rectangle.x = this.position.x;
	this.rectangle.y = this.position.y;
};

module.exports = Sprite;