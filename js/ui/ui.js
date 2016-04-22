function UI () {
	this.hide('info');
	this.selecteds = [];
	this.selectedsCount = 0;
	this.selectedsKeys = [];

	var self = this;
	global.events.on('showUI', function (data) {
		if (!self.selecteds[data.id]) {
			self.selecteds[data.id] = data;
			self.selectedsCount++;

			self.showInfo();
		}
	});

	global.events.on('hideUI', function (id) {
		if (self.selecteds[id]) {
			delete self.selecteds[id];
			self.selectedsCount--;
			
			if (self.selectedsCount == 0) {
				self.hide('info');
			}
		}

		self.showInfo();
	});

	global.events.on('showOptions', function (data) {
		self.showOptions(data);
	});
}

UI.prototype.showInfo = function() {
	if (this.selectedsCount >= 1)
		this.show('info');

	global.$('.info .options').innerHTML = '';
	global.$('.info .multiple').innerHTML = '';
	global.$('.info .individual .second ul').innerHTML = '';
	global.$('.info .individual .icon .image').className = 'image portrait';

	if (this.selectedsCount == 1) {
		this.show('info .individual');
		this.hide('info .multiple');

		this.peasant();
	} else if (this.selectedsCount > 1) {
		this.hide('info .individual');
		
		for (var i = 0; i < this.selectedsCount; i++) {
			var div = global.document.createElement('div');
			div.className = 'portrait ' + this.selecteds[Object.keys(this.selecteds)[i]].data.images.class;

			global.$('.info .multiple').appendChild(div);
		};

		this.show('info .multiple');
	}
};

UI.prototype.peasant = function() {
	var key = Object.keys(this.selecteds)[0];
	global.$('.info .individual .texts .name').innerHTML = this.selecteds[key].data.name;
	global.$('.info .individual .icon .image').className += ' ' + this.selecteds[key].data.images.class;
	global.$('.info .individual .icon .progress .value').innerHTML = this.selecteds[key].hitPoints + '/' + this.selecteds[key].data.statistics.hitPoints;
	global.$('.info .individual .icon .progress .infill').style.width = (this.selecteds[key].hitPoints * 100) / this.selecteds[key].data.statistics.hitPoints + '%';

	global.$('.info .individual .second ul').innerHTML += '<li>Armor: ' + this.selecteds[key].data.statistics.armor + '</li>';
	global.$('.info .individual .second ul').innerHTML += '<li>Damage: ' + this.selecteds[key].data.combat.damage.min + ' - ' + this.selecteds[key].data.combat.damage.max + '</li>';
	global.$('.info .individual .second ul').innerHTML += '<li>Range: ' + this.selecteds[key].data.combat.range + '</li>';
	global.$('.info .individual .second ul').innerHTML += '<li>Sight: ' + this.selecteds[key].data.statistics.sight + '</li>';
	global.$('.info .individual .second ul').innerHTML += '<li>Speed: ' + this.selecteds[key].data.statistics.speed + '</li>';

	var self = this;
	for (var i = 0; i < this.selecteds[key].data.commands.length; i++) {
		var div = global.document.createElement('div');
		div.id = this.selecteds[key].data.commands[i];
		div.className = 'portrait ' + this.selecteds[key].data.commands[i];
		div.addEventListener('click', function () {
			self.selecteds[key].executeCommand(this.id);
		});

		global.$('.info .options').appendChild(div);
	};
};

UI.prototype.showOptions = function(data) {
	global.$('.info .options').innerHTML = '';

	var key = Object.keys(this.selecteds)[0];
	var self = this;
	
	for (var i = 0; i < data.length; i++) {
		var div = global.document.createElement('div');
		div.id = data[i];
		div.className = 'portrait ' + data[i];
		div.addEventListener('click', function () {
			self.selecteds[key].executeCommand(this.id);
		});

		global.$('.info .options').appendChild(div);
	};
};

UI.prototype.hide = function(name) {
	global.$('.' + name).style.display = 'none';
};

UI.prototype.show = function(name) {
	global.$('.' + name).style.display = 'block';
};

module.exports = UI;