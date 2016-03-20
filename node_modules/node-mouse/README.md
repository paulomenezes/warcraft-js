# node-mouse

A quick adaptation mouse event handler for nodejs.

Most of the work comes from:

* [Read Linux mouse(s) in node.js](https://gist.github.com/bfncs/2020943) (Marc Loehe)
* [Node-keyboard](https://github.com/Bornholm/node-keyboard)
* [Read a Linux Joystick](https://github.com/nodebits/linux-joystick) (Tim Caswell)



# Install
```shell
    npm install node-mouse --save
```

# Usage
```javascript
var Mouse = require("./mouse.js");

var m = new Mouse();

m.on("mousedown",function(event) {
    console.log(event);
});

m.on("mouseup",function(event) {
    console.log(event);
});

// same as mouseup, but fired after
m.on("click",function(event) {
    console.log(event);
});


m.on("mousemove", function(event) {
    console.log(event);
});
```


# Licence
MIT
