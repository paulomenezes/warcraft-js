function SelectRectangle () {
	
}

SelectRectangle.prototype.draw = function(rectangle) {
	global.context.beginPath();
	global.context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
	global.context.stroke();
	global.context.closePath();
};

module.exports = SelectRectangle;