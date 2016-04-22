var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var EventEmitter;
var MapObject;
var EventMouse;
var ManagerMouse;
var ManagerTiles;
var ManagerUnits;
var ManagerBuildings;
var SelectRectangle;

var UI;

var managerMouse;
var managerTiles;
var managerUnits;
var managerBuildings;

function start () {
	global.Load('./common/functions');
	
	UI = global.Load('./ui/ui');
	MapObject = global.Load('./map/mapObject');
	EventMouse = global.Load('./event/eventMouse');
	ManagerMouse = global.Load('./manager/managerMouse');
	ManagerTiles = global.Load('./manager/managerTiles');
	ManagerUnits = global.Load('./manager/managerUnits');
	ManagerBuildings = global.Load('./manager/managerBuildings');
	SelectRectangle = global.Load('./common/selectRectangle');

	EventEmitter = require('events').EventEmitter;
}

function initialize () {
	global.window = window;
	global.context = context;
	global.document = document;
	global.selectRectangle = new SelectRectangle();
	global.events = new EventEmitter();

	new UI();
	new EventMouse();
	
	managerMouse = new ManagerMouse();
	managerTiles = new ManagerTiles();
	managerUnits = new ManagerUnits(managerTiles);
	managerBuildings = new ManagerBuildings(managerTiles);
}

function loadContent () {
	managerUnits.loadContent(Image);
	managerBuildings.loadContent(Image);
	managerTiles.loadContent(Image);
}

function update () {
	managerMouse.update();
	managerUnits.update();
	managerBuildings.update();
}

function draw () {
	global.context.clearRect(0, 0, canvas.width, canvas.height);

    managerTiles.draw();
	managerUnits.draw();
	managerBuildings.draw();
	managerMouse.draw();
}

start();
initialize();
loadContent();

setInterval(function () {
	update();
	draw();
}, 10);