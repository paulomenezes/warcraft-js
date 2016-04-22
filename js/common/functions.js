global.random = function (min, max) {
	return Math.floor(Math.random() * max + min);
}

global.$ = function (name) {
	return global.document.querySelector(name);
}