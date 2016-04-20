function Animation (asset) {
	this.width = 32;
	this.height = 32;

	this.animations = {
		"up": 	 [5, 11, 17, 23, 29],
		"down":  [6, 12, 18, 24, 30],
		"left":  [1, 8, 14, 19, 25],
		"right": [2, 9, 15, 20, 26],
	};

	this.animation = require(asset);
	this.animationIndex = 0;
	this.animationElapsed = 0;
	this.animationCurrent = 'up';
}

Animation.prototype.update = function(transitionOn) {
	if (transitionOn) {
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

Animation.prototype.updateAnimation = function(newAnimation) {
	this.animationCurrent = newAnimation;
};

Animation.prototype.getImagePosition = function(axis) {
	if (axis == 'x') {
		return this.animation[this.animations[this.animationCurrent][this.animationIndex] - 1].x - 
				(this.width - this.animation[this.animations[this.animationCurrent][this.animationIndex] - 1].width) / 2;
	} else {
		return this.animation[this.animations[this.animationCurrent][this.animationIndex] - 1].y - 
				(this.height - this.animation[this.animations[this.animationCurrent][this.animationIndex] - 1].height) / 2;
	}
};

module.exports = Animation;