var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var EventEmitter;
var MapObject;
var EventMouse;
var ManagerMouse;
var ManagerTiles;
var ManagerUnits;
var SelectRectangle;

var eventMouse;

var managerMouse;
var managerTiles;
var managerUnits;

function start () {
	MapObject = global.Load('./map/mapObject');
	EventMouse = global.Load('./event/eventMouse');
	ManagerMouse = global.Load('./manager/managerMouse');
	ManagerTiles = global.Load('./manager/managerTiles');
	ManagerUnits = global.Load('./manager/managerUnits');
	SelectRectangle = global.Load('./common/selectRectangle');

	EventEmitter = require('events').EventEmitter;
}

function initialize () {
	global.context = context;
	global.document = document;
	global.selectRectangle = new SelectRectangle();
	global.events = new EventEmitter();

	eventMouse = new EventMouse();
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

	/*for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 15; j++) {
			global.context.beginPath();
            global.context.rect(32 * i, 32 * j, 32, 32);
            global.context.fillStyle = "#0095DD";	
            //global.context.fill();
            global.context.stroke();
            global.context.closePath();
        }
    }*/

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