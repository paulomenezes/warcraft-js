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

	this.frameIndex = 0;
	this.numberOfFrames = 5;
}

Sprite.prototype.loadContent = function (Image) {
	this.texture = new Image();
	this.texture.src = './images/humans/Peasant/Peasant_walking.png';

	this.animations = {
		"up": 	 [5, 11, 17, 23, 29],
		"down":  [6, 12, 18, 24, 30],
		"left":  [1, 8, 14, 19, 25],
		"right": [2, 9, 15, 20, 26],
	};

	this.animation = require('../../images/humans/Peasant/Peasant_walking.json');
	this.animationIndex = 0;
	this.animationElapsed = 0;
	this.animationCurrent = 'up';
};

Sprite.prototype.update = function () {
	if (this.transitionOn) {
		this.updateTransition();
	
		this.animationElapsed++;
		if (this.animationElapsed > 5) {
			this.animationIndex++;
			this.animationElapsed = 0;

			if (this.animationIndex > 4) {
				this.animationIndex = 0;
			}
		}
	} else {
		this.animationIndex = 0;
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
		this.getImagePosition('x'), 
		this.getImagePosition('y'), 
		this.width, this.height, 
		this.position.x, this.position.y, 
		this.width, this.height);
};

Sprite.prototype.updateTransition = function () {
	if (this.wantedPos.x < this.tilePosition.x) {
		this.position.x -= this.speed;
		this.animationCurrent = 'left';

		if ((this.position.x - this.wantedPos.x * this.width) == 0) 
			this.tilePosition.x--;
	} else if (this.wantedPos.x > this.tilePosition.x) {
		this.position.x += this.speed;
		this.animationCurrent = 'right';

		if ((this.position.x - this.wantedPos.x * this.width) == 0)
			this.tilePosition.x++;
	} else if (this.wantedPos.y < this.tilePosition.y) {
		this.position.y -= this.speed;
		this.animationCurrent = 'up';

		if ((this.position.y - this.wantedPos.y * this.height) == 0)
			this.tilePosition.y--;
	} else if (this.wantedPos.y > this.tilePosition.y) {
		this.position.y += this.speed;
		this.animationCurrent = 'down';

		if ((this.position.y - this.wantedPos.y * this.height) == 0)
			this.tilePosition.y++;
	} else {
		this.transitionOn = false;
	}

	this.rectangle.x = this.position.x;
	this.rectangle.y = this.position.y;
};

Sprite.prototype.getImagePosition = function(axis) {
	if (axis == 'x') {
		return this.animation[this.animations[this.animationCurrent][this.animationIndex] - 1].x - 
				(this.width - this.animation[this.animations[this.animationCurrent][this.animationIndex] - 1].width) / 2;
	} else {
		return this.animation[this.animations[this.animationCurrent][this.animationIndex] - 1].y - 
				(this.height - this.animation[this.animations[this.animationCurrent][this.animationIndex] - 1].height) / 2;
	}
};

module.exports = Sprite;