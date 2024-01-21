const pong = document.getElementById("pong");
const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");
const ball = document.getElementById("ball");

const ballSpeed = 6     ;
const paddleSpeed = 5;

let leftPaddleY = 150;
let rightPaddleY = 150;
let ballX = 300;
let ballY = 200;
let ballXSpeed = ballSpeed;
let ballYSpeed = ballSpeed;

// Listen to user arrow up and down
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed;
  }
  if (event.key === "ArrowDown" && rightPaddleY < 300) {
    rightPaddleY += paddleSpeed;
  }
});

function computerPaddle() {
  // If ballY position is more than leftPaddleY (meaning ball is moving up, u move the leftpaddle up)
  if (leftPaddleY + 50 < ballY && leftPaddleY < 300) {
    leftPaddleY += paddleSpeed;
  }
  // If ballY position is less than leftPaddleY (meaning ball is moving down, u move the leftpaddle down)
  else if (leftPaddleY + 50 > ballY && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
  }
}

function gameLoop() {
  // continuosly increase x,y position (move the ball)
  ballX += ballXSpeed;
  ballY += ballYSpeed;

  //bouncing when hit top or bottom (Y)
  if (ballY <= 0 || ballY >= 380) {
    ballYSpeed = -ballYSpeed;
  }

  if (ballX <= 0) {
    if (ballY + 20 >= leftPaddleY && ballY <= leftPaddleY + 100) {
      ballXSpeed = -ballXSpeed;
    } else {
      resetBall();
    }
  }

  if (ballX >= 580) {
    if (ballY + 20 >= rightPaddleY && ballY <= rightPaddleY + 100) {
      ballXSpeed = -ballXSpeed;
    } else {
      alert('Game Over')
      resetBall();
    }
  }

  computerPaddle()
  leftPaddle.style.top = `${leftPaddleY}px`;
  rightPaddle.style.top = `${rightPaddleY}px`;
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  requestAnimationFrame(gameLoop);
}

function resetBall() {
  ballX = 300;
  ballY = 200;
  ballXSpeed = ballSpeed;
  ballYSpeed = ballSpeed;
}