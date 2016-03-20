/**
 * Author: Javier Infante (jabi@irontec.com)
 *
 * (very lightly) Adapted  from Read Linux mouse(s) in node.js
 * Author: Marc Loehe (marcloehe@gmail.com)
 * https://gist.github.com/bfncs/2020943
 *
 * Adapted from Tim Caswell's nice solution to read a linux joystick
 * http://nodebits.org/linux-joystick
 * https://github.com/nodebits/linux-joystick
 */

var fs = require('fs'),
    EventEmitter = require('events').EventEmitter;

/**
 * Keep previoous button status
 */
var prevLeftBtn, prevRightBtn, prevMiddleBtn = false;

/**
 * Parse PS/2 mouse protocol
 * According to http://www.computer-engineering.org/ps2mouse/
 */
function parse(mouse, buffer) {
  var event = {
    leftBtn:    (buffer[0] & 1  ) > 0, // Bit 0
    rightBtn:   (buffer[0] & 2  ) > 0, // Bit 1
    middleBtn:  (buffer[0] & 4  ) > 0, // Bit 2
    xSign:      (buffer[0] & 16 ) > 0, // Bit 4
    ySign:      (buffer[0] & 32 ) > 0, // Bit 5
    xOverflow:  (buffer[0] & 64 ) > 0, // Bit 6
    yOverflow:  (buffer[0] & 128) > 0, // Bit 7
    xDelta:      buffer.readInt8(1),   // Byte 2 as signed int
    yDelta:      buffer.readInt8(2)    // Byte 3 as signed int
  };

  // Default event
  event.type = 'mousemove';
  event.button = false;

  if (event.leftBtn || event.rightBtn || event.middleBtn) {
    event.type = 'mousedown';

    if (event.leftBtn) {
      event.button = 0;
    } else if (event.middleBtn) {
      event.button = 1;
    } else if (event.rightBtn) {
      event.button = 2;
    }

  } else if (prevLeftBtn || prevRightBtn || prevMiddleBtn) {

    event.type = 'mouseup';
    if (prevLeftBtn) {
      event.button = 0;
    } else if (prevMiddleBtn) {
      event.button = 1;
    } else if (prevRightBtn) {
      event.button = 2;
    }
  }
  prevLeftBtn = event.leftBtn;
  prevRightBtn = event.rightBtn;
  prevMiddleBtn = event.middleBtn;
  return event;
}

function Mouse(mouseid) {
  this.wrap('onOpen');
  this.wrap('onRead');
  this.dev = typeof(mouseid) === 'number' ? 'mouse' + mouseid : 'mice';
  this.buf = new Buffer(3);
  fs.open('/dev/input/' + this.dev, 'r', this.onOpen);
}

Mouse.prototype = Object.create(EventEmitter.prototype, {
  constructor: {value: Mouse}
});

Mouse.prototype.wrap = function(name) {
  var self = this;
  var fn = this[name];
  this[name] = function (err) {
    if (err) return self.emit('error', err);

    return fn.apply(self, Array.prototype.slice.call(arguments, 1));
  };
};

Mouse.prototype.onOpen = function(fd) {
  this.fd = fd;
  this.read();
};

Mouse.prototype.read = function() {
  fs.read(this.fd, this.buf, 0, 3, null, this.onRead);
};

Mouse.prototype.onRead = function(bytesRead) {
  var event = parse(this, this.buf);
  event.dev = this.dev;
  this.emit(event.type, event);
  if (event.type == 'mouseup') {
    event.type = 'click';
    this.emit('click', event);
  }
  if (this.fd) this.read();
};

Mouse.prototype.close = function(callback) {
  fs.close(this.fd, (function(){console.log(this);}));
  this.fd = undefined;
};

module.exports = Mouse;

