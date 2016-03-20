function EventMouse () {
	global.mouse = {
		leftButton: false,
		rightButton: false,
		position: {
			x: 0, 
			y: 0
		}
	};

	global.document.onmousedown = function (e) {
		if (e.button == 0) 
			global.mouse.leftButton = true;
		else 
			global.mouse.rightButton = true;
	};

	global.document.onmouseup = function (e) {
		if (e.button == 0) 
			global.mouse.leftButton = false;
		else 
			global.mouse.rightButton = false
	};

	global.document.onmousemove = function (e) {
		global.mouse.position = {
			x: e.x,
			y: e.y
		};
	}
}

module.exports = EventMouse;