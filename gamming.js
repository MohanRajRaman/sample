var canvas = document.getElementById("gameBox");
var c = canvas.getContext("2d");
var container = {x: 0, y: 0, width: 600, height: 300 };
var balls = [];

var speed =  document.getElementById('speed');
var pause = document.getElementById('pause');

var isPaused = false;
var emcount = document.getElementById('everyMinCount');
var ccount  = document.getElementById('currentCount');
var counter = 0;
var ballRadius = 10;



canvas.onclick = function (e) {
    cancelAnimationFrame(makeBall);
    isPaused = false;
    pause.checked =true;
    var cvx = Math.floor(Math.random() * 10) - 3;
    if(container.x + container.width < e.pageX || container.y + ballRadius < e.pageY) {
        var ball = {x: e.pageX, y: e.pageY, r: ballRadius, color: 35, vx: cvx, vy: -1};
        balls.push(ball);
    }
}

speed.onchange = function () {
    setInterval(function() {
        animate();
    }, this.value);
}

pause.onchange = function () {
    if(this.checked)
    {
       isPaused = false;
    }else{
      isPaused = true;
    }
    animate();
}


function makeBall() {
    c.fillStyle = "#000000";
    c.fillRect(container.x, container.y, container.width, container.height);
    for (var i = 0; i < balls.length; i++) {

        c.fillStyle = 'hsl(' + balls[i].color++ + ', 100%, 50%)';
        c.beginPath();
        c.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2);
        c.fill();

        if((balls[i].x + balls[i].vx + balls[i].r > container.x + container.width)  ||
            (balls[i].x-balls[i].r + balls[i].vx < container.x)){
            counter = counter + 1;
            balls[i].vx = -balls[i].vx;
        }

        if((balls[i].y + balls[i].vy + balls[i].r > container.y + container.height)  ||
            (balls[i].y-balls[i].r + balls[i].vy < container.y)){
            balls[i].vy = -balls[i].vy;
            counter = counter + 1;
        }

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;

    }
    animate();
}
animate();


function animate() {

    if(isPaused)
    {
        cancelAnimationFrame(makeBall);
    }else{

        requestAnimationFrame(makeBall);
    }

    ccount.innerHTML  = counter;
}

setInterval(function () {
    emcount.innerHTML += counter + ', ';
    counter = 0;
},60000);

