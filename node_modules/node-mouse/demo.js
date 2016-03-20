var Mouse = require("node-mouse");

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
