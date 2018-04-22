var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 600;
var COL_NUMBER = 6;
var ROW_NUMBER = 6;
var COL_WIDTH = Math.floor(CANVAS_WIDTH / COL_NUMBER);
var ROW_HEIGHT = Math.floor(CANVAS_HEIGHT / ROW_NUMBER);
var FPS = 30;
var fpsElement = document.getElementById('FPS');


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

// Load resources
resources.load([
    'img/sprites.png'
]);
resources.onReady(init);

function init() {
    board.init();
    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        board.addDrop(mousePos.x, mousePos.y);        
      }, false);
    main();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// The main game loop
var lastTime = Date.now();
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    fpsElement.innerHTML = "FPS: " + Math.round(1000/(now - lastTime));
    update(dt);
    draw(ctx);

    lastTime = now;
    requestAnimFrame(main);
};

function update(dt) {
    board.update(dt);
    if (window.keydown[37]) {
        cursor.right();
    }

    if (window.keydown[38]) {
        cursor.up();
    }

    if (window.keydown[39]) {
        cursor.left();
    }

    if (window.keydown[40]) {
        cursor.down();
    }
    

}

function draw(ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    board.draw(ctx);
}


