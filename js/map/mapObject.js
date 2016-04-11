var Sprite = global.Load('./map/sprite');
var Movement = global.Load('./map/movement');

global.first = true;

function MapObject (manageTiles, tileX, tileY) {
	this.sprite = new Sprite(tileX, tileY);
	this.movement = new Movement(this.sprite, manageTiles);
	this.selected = false;
}

MapObject.prototype.loadContent = function(Image) {
	this.sprite.loadContent(Image);

	var self = this;
	global.events.on('selectRectangle', function (selectRectangle) {
		self.checkDetection(selectRectangle);
	});

	global.events.on('move', function (position) {
		if (self.selected) {
			self.movement.move(parseInt(position.x / 32), parseInt(position.y / 32));
		}
	});

	global.events.on('select', function (position) {
		if (global.first) {
			self.checkDetection({
				x: position.x,
				y: position.y,
				width: 1,
				height: 1
			});
		} else {
			self.selected = false;
		}
	});
};

MapObject.prototype.update = function() {
	this.sprite.update();
	this.movement.update();
};

MapObject.prototype.draw = function() {
	this.sprite.draw();

	if (this.selected) {
		global.selectRectangle.draw(this.sprite.rectangle);
	}
};

MapObject.prototype.checkDetection = function(rectangle) {
	if (this.sprite.rectangle.x > rectangle.x && this.sprite.rectangle.y > rectangle.y &&
		this.sprite.rectangle.x + this.sprite.rectangle.width < rectangle.x + rectangle.width &&
		this.sprite.rectangle.y + this.sprite.rectangle.height < rectangle.y + rectangle.height) {
		this.selected = true;
	} else if (this.sprite.rectangle.x < rectangle.x && this.sprite.rectangle.y < rectangle.y &&
		 	   this.sprite.rectangle.x + this.sprite.rectangle.width > rectangle.x + rectangle.width &&
		 	   this.sprite.rectangle.y + this.sprite.rectangle.height > rectangle.y + rectangle.height) {
		this.selected = true;
		global.first = false;
	} else {
		this.selected = false;
	}
};

module.exports = MapObject;