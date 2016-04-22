var Pathfinding = global.Load('./common/pathfinding');

var action = null;

function Movement (_sprite, manageTiles, callback) {
	this.sprite = _sprite;
	this.pathfinding = new Pathfinding(this.sprite.tilePosition.x, this.sprite.tilePosition.y, manageTiles);

	this.speed = 1;
	this.transitionOn = false;
	this.wantedTile = {
		x: 0,
		y: 0
	};

	this.callback = callback;

	this.path = [];
}

Movement.prototype.move = function(xTile, yTile, _action) {
	if (this.sprite.tilePosition.x == xTile && this.sprite.tilePosition.y == yTile) 
		return;

	this.pathfinding.setGoal(this.sprite.tilePosition.x, this.sprite.tilePosition.y, xTile, yTile);
	this.path = this.pathfinding.findPath();

	action = _action;
	
	if (this.path) {
		this.path = this.path.reverse();

		this.wantedTile = {
			x: xTile,
			y: yTile
		};

		this.transitionOn = true;
		this.sprite.goalPosition = this.wantedTile;
	}
};

Movement.prototype.update = function() {
	if (this.transitionOn) {
		this.updateTransition();
	}
};

Movement.prototype.updateTransition = function() {
	if (this.sprite.transitionOn)
		return;

	if (this.path && this.path.length > 0) {
		var wantedTile = {
			x: this.path[0][0],
			y: this.path[0][1]
		};

		if (this.sprite.tilePosition.x < wantedTile.x) {
			this.sprite.move(1, 0, this.speed);
		} else if (this.sprite.tilePosition.x > wantedTile.x) {
			this.sprite.move(-1, 0 , this.speed);
		} else if (this.sprite.tilePosition.y < wantedTile.y) {
			this.sprite.move(0, 1, this.speed);
		} else if (this.sprite.tilePosition.y > wantedTile.y) {
			this.sprite.move(0, -1, this.speed);
		}

		this.path.splice(0, 1);
	} else {
		this.transitionOn = false;

		if (action) {
			global.events.emit('builder', action.data, action.position);
			this.building = true;
			this.callback();
		}
	}
}

module.exports = Movement;