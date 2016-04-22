var STATES = {
	'WAITING': 'waiting', 
	'TYPE': 'type',
	'PLACE': 'place',
	'BUILDING': 'building',
	'FINISH': 'finish'
}

function Builder () {
	this.data = null;
	this.building = null;
	this.currentState = STATES.WAITING;
}

Builder.prototype.execute = function(name, peasant) {
	console.log('execute');

	this.currentState = STATES.TYPE;
	
	this.building = name;
	this.peasant = peasant;
	this.data = global.Require('./js/data/' + name + '.json');

	this.texture.src = this.data.images.sprites;
	
	this.currentState = STATES.PLACE;
	global.events.emit('mouseState', 'builder', this.data);

	var self = this;
	global.events.on('selectPlace', function (position) {
		self.currentState = STATES.BUILDING;
		global.events.emit('mouseState', 'select');
	});
};

Builder.prototype.loadContent = function(Image) {
	this.texture = new Image();
};

Builder.prototype.update = function() {
	
};

Builder.prototype.draw = function() {
	if (this.currentState == STATES.PLACE) {
		global.context.drawImage(
			this.texture, 
			this.data.sprites[this.data.sprites.length - 1].x, 
			this.data.sprites[this.data.sprites.length - 1].y, 
			this.data.sprites[this.data.sprites.length - 1].width, 
			this.data.sprites[this.data.sprites.length - 1].height, 
			global.mouse.position.x - (this.data.sprites[this.data.sprites.length - 1].width / 2), 
			global.mouse.position.y - (this.data.sprites[this.data.sprites.length - 1].height / 2), 
			this.data.sprites[this.data.sprites.length - 1].width, 
			this.data.sprites[this.data.sprites.length - 1].height);
	}	
};

module.exports = Builder;

/**
 * 1. select a structure
 * 2. select a place
 * 3. building and busy the peasant
 * 4. finish and free peasant
 */