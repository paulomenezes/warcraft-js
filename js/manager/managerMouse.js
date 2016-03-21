function ManagerMouse (_eventMouse) {
	this.mouseDown = false;

	this.position = {
		x: 0,
		y: 0
	};

	this.selectCorner = {
		x: 0,
		y: 0
	};

	this.selectRectangle = {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};

	this.lastClick = null;
}

ManagerMouse.prototype.update = function() {
	if (global.mouse.rightButton && this.lastClick != global.mouse.position) {
		this.lastClick = global.mouse.position;
		global.events.emit('click', global.mouse.position);
	}

	if (global.mouse.leftButton && !this.mouseDown) {
		this.mouseDown = true;
		this.position = global.mouse.position;
		this.selectCorner = this.position;

		this.selectRectangle = {
			x: this.position.x,
			y: this.position.y,
			width: 0,
			height: 0
		};
	} else if (global.mouse.leftButton) {
		this.selectCorner = global.mouse.position;

		if (this.selectCorner.x > this.position.x) {
			this.selectRectangle.x = this.position.x;
		} else {
			this.selectRectangle.x = this.selectCorner.x;
		}

		if (this.selectCorner.y > this.position.y) {
			this.selectRectangle.y = this.position.y;
		} else {
			this.selectRectangle.y = this.selectCorner.y;
		}

		this.selectRectangle.width = Math.abs(this.position.x - this.selectCorner.x);
		this.selectRectangle.height = Math.abs(this.position.y - this.selectCorner.y);
	} else {
		if (this.selectRectangle.width > 0 || this.selectRectangle.height > 0) {
			global.events.emit('selectRectangle', this.selectRectangle);

			this.selectRectangle = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		}

		this.mouseDown = false;
	}
};

ManagerMouse.prototype.draw = function() {
	if (this.mouseDown) {
		global.selectRectangle.draw(this.selectRectangle);
	}
};

module.exports = ManagerMouse;