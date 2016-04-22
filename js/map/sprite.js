var Animation = global.Load('./common/animation');

function Sprite (xTilePos, yTilePos, data) {
	this.width = data.size.width;
	this.height = data.size.height;

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

	this.goalPosition = {
		x: 0,
		y: 0
	}

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

	this.data = data;
	this.animation = new Animation(data);
}

Sprite.prototype.loadContent = function (Image) {
	this.texture = new Image();
	this.texture.src = this.data.images.sprites;
};

Sprite.prototype.update = function () {
	if (this.transitionOn) {
		this.updateTransition();
	}

	this.animation.update(this.transitionOn);
};

Sprite.prototype.move = function (x, y, speed) {
	this.wantedPos.x = this.tilePosition.x + x;
	this.wantedPos.y = this.tilePosition.y + y;

	this.transitionOn = true;

	this.speed = speed;
}

Sprite.prototype.draw = function () {
	if (this.transitionOn) {
		global.context.beginPath();
		global.context.moveTo(this.position.x + 16, this.position.y + 16);
		global.context.lineTo(this.goalPosition.x * 32 + 16, this.goalPosition.y * 32 + 16);
		global.context.stroke();
	}

	global.context.drawImage(
		this.texture, 
		this.animation.getImagePosition('x'), 
		this.animation.getImagePosition('y'), 
		this.width, this.height, 
		this.position.x, this.position.y, 
		this.width, this.height);
};

Sprite.prototype.updateTransition = function () {
	if (this.wantedPos.x < this.tilePosition.x) {
		this.position.x -= this.speed;
		this.animation.updateAnimation('left');

		if ((this.position.x - this.wantedPos.x * this.width) == 0) 
			this.tilePosition.x--;
	} else if (this.wantedPos.x > this.tilePosition.x) {
		this.position.x += this.speed;
		this.animation.updateAnimation('right');

		if ((this.position.x - this.wantedPos.x * this.width) == 0)
			this.tilePosition.x++;
	} else if (this.wantedPos.y < this.tilePosition.y) {
		this.position.y -= this.speed;
		this.animation.updateAnimation('up');

		if ((this.position.y - this.wantedPos.y * this.height) == 0)
			this.tilePosition.y--;
	} else if (this.wantedPos.y > this.tilePosition.y) {
		this.position.y += this.speed;
		this.animation.updateAnimation('down');

		if ((this.position.y - this.wantedPos.y * this.height) == 0)
			this.tilePosition.y++;
	} else {
		this.transitionOn = false;
	}

	this.rectangle.x = this.position.x;
	this.rectangle.y = this.position.y;
};

module.exports = Sprite;