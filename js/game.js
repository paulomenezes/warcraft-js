var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var EventEmitter;
var MapObject;
var EventMouse;
var ManagerMouse;
var ManagerTiles;
var ManagerUnits;
var SelectRectangle;

var managerMouse;
var managerTiles;
var managerUnits;

function start () {
	global.Load('./common/functions');

	MapObject = global.Load('./map/mapObject');
	EventMouse = global.Load('./event/eventMouse');
	ManagerMouse = global.Load('./manager/managerMouse');
	ManagerTiles = global.Load('./manager/managerTiles');
	ManagerUnits = global.Load('./manager/managerUnits');
	SelectRectangle = global.Load('./common/selectRectangle');

	EventEmitter = require('events').EventEmitter;

	context.canvas.width = window.innerWidth;
	context.canvas.height = window.innerHeight;
}

function initialize () {
	global.window = window;
	global.context = context;
	global.document = document;
	global.selectRectangle = new SelectRectangle();
	global.events = new EventEmitter();

	new EventMouse();
	managerMouse = new ManagerMouse();
	managerTiles = new ManagerTiles();
	managerUnits = new ManagerUnits(managerTiles);
}

function loadContent () {
	managerUnits.loadContent(Image);
	managerTiles.loadContent(Image);
}

function update () {
	managerMouse.update();
	managerUnits.update();
}

function draw () {
	global.context.clearRect(0, 0, canvas.width, canvas.height);

    managerTiles.draw();
	managerUnits.draw();
	managerMouse.draw();
}

start();
initialize();
loadContent();

setInterval(function () {
	update();
	draw();
}, 10);