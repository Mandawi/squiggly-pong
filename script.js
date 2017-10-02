<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Macondo" rel="stylesheet">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Squiggly Pong</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h4>Squiggly Pong</h4>
  <h6>Score 10 to win! Use your curser to move!</h6>
  <h6>Press function key #11 for fullscreen</h6>
    <canvas id="gameCanvas" width="800" height="300"></canvas>
<p id="game">
    <script>

      var canvas;
      var canvasContext;
      var ballX = 400; //ball's horizontal position
      var ballSpeedX = 10; //love vars
      var ballY = 250; //ball's vertical position
      var ballSpeedY = 8;
      var player1Score=0;
      var player2Score=0;
      var paddle1Y = 250;
      var paddle2Y = 250;
      var PADDLE_HEIGHT = 100; //constant that won't change
      const PADDLE_THICKNESS = 15;
      const WINNING_SCORE = 10;
      var showingWinScreen = false; //boolean just like that

      function calculateMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft; //event making
        var mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
          x:mouseX,
          y:mouseY
        };
      }

      function handleMouseClick(evt) {
        if (showingWinScreen){
          player1Score = 0;
          player2Score = 0;
          showingWinScreen = false;
        }
      }
      window.onload = function() {

        canvas=document.getElementById('gameCanvas'); //uses html
        canvasContext= canvas.getContext('2d'); 

        var framesPerSecond=60;//change things to fps
        //magic animation trick
        setInterval(function(){
          moveEverything();
          drawEverything();
        }, 1000/framesPerSecond);//function, milliseconds

        canvas.addEventListener('mousedown', handleMouseClick);

        canvas.addEventListener('mousemove', //available with keep pressed and other events
                                function(evt){
          var mousePos = calculateMousePos(evt);
          paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
        });

      }

      function ballReset(){
        if(player1Score >= WINNING_SCORE || //winning condition
           player2Score >= WINNING_SCORE) {
          showingWinScreen=true;
        }
        ballX = canvas.width/2;
        ballY = canvas.height/2;
        ballSpeedX*=-1;
      }

      function computerMovement(){
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
        if(paddle2YCenter < ballY-25) { //above ball go up
          paddle2Y += 10;
        } else if(paddle2YCenter > ballY+25){ //below ball go down
          paddle2Y -= 10;
        }

      }

      function moveEverything(){
        computerMovement();

        if (showingWinScreen) {
          return;
        }

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if(ballX <= PADDLE_THICKNESS) {
          if (ballY > paddle1Y && 
              ballY < paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX *= -1;
            var deltaY = ballY //change of y
            -(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
          }
        }
        if(ballX <= -1){
          player2Score++; //keep first
          ballReset();
        }

        if(ballX >= canvas.width-PADDLE_THICKNESS) {
          if (ballY > paddle2Y && 
              ballY < paddle2Y+PADDLE_HEIGHT) {
            ballSpeedX *= -1;
            var deltaY = ballY //change of y
            -(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
          }
        }
        if(ballX >= canvas.width+1) {
          player1Score++; //keep first
          ballReset();
        }
        if(ballY < 0) {
          ballSpeedY*=-1;
        }
        if(ballY > canvas.height) {
          ballSpeedY*=-1;
        }
      }

      function drawNet(){
        for(var i=20; i<canvas.height-20; i+=60){
          colorRect(canvas.width/2-1,i,5,20,'red');
        }
      }

      function drawEverything() {

        //canvas is next
        colorRect(0,0,canvas.width,canvas.height,'black');
        if (showingWinScreen) {
          canvasContext.font="30px Verdana"
          canvasContext.fillStyle = 'white';
          if (player1Score >= WINNING_SCORE){
            canvasContext.fillText("YOU ROCK!", 310,100);
          }else if(player2Score >= WINNING_SCORE){
            canvasContext.fillText("YOU SUCK!", 310,100);
          }
          canvasContext.fillStyle = 'red';
          canvasContext.font="20px Verdana"
          canvasContext.fillText("RESTART?",340,200);
          PADDLE_HEIGHT=100;
          return;
        }

        drawNet();

        //player paddle is next
        colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

        //AI player paddle is next
        colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,
                  PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

        //circle call is next
        colorCircle(ballX, ballY, 10, 'white');

        canvasContext.font="30px Verdana";
        canvasContext.fillText(player1Score, 100,100);
        canvasContext.fillText(player2Score, canvas.width-100,100);
      }

      function colorCircle(centerX, centerY, radius, drawColor){// draws circle
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath(); //fills in
        canvasContext.arc(centerX,centerY,radius, 0,Math.PI*2, true); //center X, center Y, radius, angle, radians, which section to see)
        canvasContext.fill();
      }

      function colorRect(leftX,topY, width, height, drawColor){ //draws rectangles
        canvasContext.fillStyle=drawColor;
        canvasContext.fillRect(leftX,topY, width, height); 

      }

    </script>
 
  </p>
</body>
  <footer></footer>
</html>
