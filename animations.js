var canvas;
var canvasContext;

var ballx=50;
var bally=50;
var ballSpeedx=10;
var ballSpeedy=4;

const PADDLEHEIGHT=100;
const PADDLETHICKNESS=10;
var paddle1y=250;
var paddle2y=250;

var player1score=0;
var player2score=0;
var WINNINGSCORE = 3;

var showingwinscreen    =   false;


window.onload = function() {
	console.log("Tennis Game initialised!");
	canvas = document.getElementById('playground');
	canvasContext = canvas.getContext('2d');

    var framesPerSecond=30;
    setInterval(function(){
        mover();
        fetchobj();
    },1000/framesPerSecond);     // to give interval b/w the again and again calling of the function


    canvas.addEventListener("mousedown",handleMouseClick  );

    canvas.addEventListener('mousemove',
    function(evt){
            var mousePOS   =  mouseposition(evt);
            paddle2y    =   mousePOS.y - (PADDLEHEIGHT/2);
    });

}

function handleMouseClick(evt){
    if(showingwinscreen){
        player1score=0;
        player2score=0;
        showingwinscreen    =   false;
    }
}

function ballreset(){
        if(player1score >= WINNINGSCORE || player2score >= WINNINGSCORE){
            showingwinscreen    =   true;
        }

    ballSpeedx = -ballSpeedx;
    ballx=canvas.width/2;
    bally=canvas.height/2
}

function computerMovement(){
    var paddle1yCenter = paddle1y + (PADDLEHEIGHT/2);
    if(paddle1yCenter <  bally-35){
        paddle1y  = paddle1y + 6;
    } else{
        paddle1y   =   paddle1y -6;
    }
}

function mover(){
         if(showingwinscreen){
            return;
        }

    computerMovement();

    ballx=ballx+ballSpeedx;
    bally=bally+ballSpeedy;
    if(bally < 0){
        ballSpeedy = -ballSpeedy;
    }
    if(bally > canvas.height){
        ballSpeedy = -ballSpeedy;
    }
    if(ballx < 0){
            if(bally    >   paddle1y && bally <paddle1y + PADDLEHEIGHT){
                ballSpeedx = -ballSpeedx;
                
                var deltay = bally - (paddle1y+PADDLEHEIGHT/2);
                ballSpeedy = deltay * 0.35;
            }
            else{
                player2score++;
                ballreset();
       player2score++;
    }
    }
    if(ballx > canvas.width){
        if(bally    >   paddle2y && bally < paddle2y + PADDLEHEIGHT){
                ballSpeedx = -ballSpeedx;

                var deltay = bally - (paddle2y+PADDLEHEIGHT/2);
                ballSpeedy = deltay * 0.35;
            
            }
            else{
                player1score++;
                ballreset();
                
    }
    }

}

function mouseposition(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mousex  = evt.clientX - rect.left - root.scrollLeft;
    var mousey  = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mousex,
        y:mousey
    };

}

function drawNet(){
    for(var i=0; i<canvas.height; i+=40){
        colorRect(canvas.width/2-1, i,2,20,'white')
    }
}

function fetchobj(){
    //for court
    colorRect(0, 0, canvas.width, canvas.height, 'green');

    if(showingwinscreen){
        canvasContext.fillStyle="black";
        if(player1score >= WINNINGSCORE){
            canvasContext.fillText("Player at the Left won", 350, 200);
        }
        else if(player2score >= WINNINGSCORE){
            canvasContext.fillText("Player at the Right won", 350, 200);
        }
        canvasContext.fillText("Match Over! Play Again...", 350, 500);
            return;
        }

        drawNet();

    //for left paddle computer
    colorRect(0, paddle1y, PADDLETHICKNESS, PADDLEHEIGHT,'blue');
    //for right paddle
    colorRect(canvas.width-PADDLETHICKNESS, paddle2y, PADDLETHICKNESS, PADDLEHEIGHT, 'blue');
    //for ball
    colorball(ballx, bally, 10, 'red');

    canvasContext.fillText(player1score, 100, 100);
    canvasContext.fillText(player2score, canvas.width-100, 100);

}

function colorRect(leftx, topy, width, height, drawcolor){
    canvasContext.fillStyle=drawcolor;
    canvasContext.fillRect(leftx, topy, width, height);
}

function colorball(centerx, centery, radius, drawcolor){
    canvasContext.fillStyle=drawcolor;
	canvasContext.beginPath();
    canvasContext.arc(centerx, centery, radius, 0, Math.PI*2, true);
    canvasContext.fill();

}
