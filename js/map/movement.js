var Pathfinding = global.Load('./common/pathfinding');

function Movement (_sprite, manageTiles) {
	this.sprite = _sprite;
	this.pathfinding = new Pathfinding(this.sprite, manageTiles);

	this.speed = 2;
	this.transitionOn = false;
	this.wantedTile = {
		x: 0,
		y: 0
	};
}

Movement.prototype.move = function(xTile, yTile) {
	if (this.sprite.tilePosition.x == xTile && this.sprite.tilePosition.y == yTile) 
		return;

	console.log('move', xTile, yTile);
	this.pathfinding.setGoal(xTile, yTile);
	console.log(this.pathfinding.findPath());

	this.wantedTile = {
		x: xTile,
		y: yTile
	};

	this.transitionOn = true;
};

Movement.prototype.update = function() {
	if (this.transitionOn) {
		this.updateTransition();
	}
};

Movement.prototype.updateTransition = function() {
	if (this.sprite.transitionOn)
		return;

	if (this.sprite.tilePosition.x < this.wantedTile.x) {
		this.sprite.move(1, 0, this.speed);
	} else if (this.sprite.tilePosition.x > this.wantedTile.x) {
		this.sprite.move(-1, 0 , this.speed);
	} else if (this.sprite.tilePosition.y < this.wantedTile.y) {
		this.sprite.move(0, 1, this.speed);
	} else if (this.sprite.tilePosition.y > this.wantedTile.y) {
		this.sprite.move(0, -1, this.speed);
	}

	if (this.sprite.tilePosition.x == this.wantedTile.x && this.sprite.tilePosition.y == this.wantedTile.y) 
		this.transitionOn = false;
}

module.exports = Movement;