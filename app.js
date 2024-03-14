//HTML variables
const score = document.getElementById("score");
const highScore = document.getElementById("highScore");
const board = document.getElementById("board");
const logo = document.getElementById("logo");
const instructionText = document.getElementById("text_instrucion");

// Variables
let snake = [{ x: 12, y: 12 }];
let gridSize = 25;
let food = generateFood();
let direction = "right";
let interval;
let gameSpeed = 200;
let gameStarted = false;
let scorePoint = 0;
let highScorePoint = 0;

function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

function move() {
  snakeMove();
}

function drawSnake() {
  snake.forEach((fragment) => {
    let snakeElement = createGameElement("div", "snake");
    board.appendChild(snakeElement);
    setPosition(snakeElement, fragment);
  });
}

function createGameElement(tag, className) {
  let element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridRow = position.y;
  element.style.gridColumn = position.x;
}

 function drawFood() {
   let foodElement = createGameElement("div", "food");
   board.appendChild(foodElement);
   setPosition(foodElement, food);
 }

function generateFood() {
  let x = Math.ceil(Math.random() * gridSize);
  let y = Math.ceil(Math.random() * gridSize);

  return {x: x, y: y}
}

// MOVENDO A COBRA
function snakeMove() {
  let newHead = { ...snake[0] };

  switch (direction) {
    case "right":
      newHead.x++;
      break;
    case "left":
      newHead.x--;
      break;
    case "up":
      newHead.y--;
      break;
    case "down":
      newHead.y++;
      break;
    default:
      break;
  }

  snake.unshift(newHead);

  if (snake[0].x === food.x && snake[0].y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(interval);
    interval = setInterval(() => {
      move();
      draw();
      checkCollision();
    }, gameSpeed);

    increaseScore();
  } else {
    snake.pop();
  }
}

//AUMENTANDO A VELOCIDADE
function increaseSpeed() {
  if (gameSpeed > 150) {
    gameSpeed = gameSpeed - 10;
  } else if (gameSpeed > 100) {
    gameSpeed = gameSpeed - 3;
  } else if (gameSpeed > 70) {
    gameSpeed = gameSpeed - 2;
  } else if (gameSpeed > 50) {
    gameSpeed = gameSpeed - 1;
  }
  console.log(gameSpeed);
}

//MARCANDO A PONTUAÇÃO
function increaseScore() {
  scorePoint++;
  console.log(scorePoint.toString());
  score.innerText = scorePoint.toString().padStart(3, "0");
}

// CHECAGEM DE COLISÃO
function checkCollision() {
  let head = snake[0];

  if (head.x < 0 || head.x > 25 || head.y < 0 || head.y > 25) {
    resetGame();
  }

  if (snake.length > 3) {
    for (let i = 1; i < snake.length; i++) {
      if (head.x == snake[i].x && head.y == snake[i].y) {
        resetGame();
      }
    }
  }
}

//Resetando o jogo
function resetGame() {
  if (scorePoint > highScorePoint) {
    highScore.innerText = scorePoint.toString().padStart(3, "0");
  }

  scorePoint = 0;
  document.getElementsByClassName("snake")[0].style.display = "none";
  snake = [{ x: 12, y: 12 }];
  clearInterval(interval);
  gameSpeed = 200;
  gameStarted = false;
  direction = "right";
  logo.style.display = "block";
  instructionText.style.display = "block";
}

// INICIANDO O JOGO / ALTERANDO A DIREÇÃO DA COBRA
function keySelected(event) {
  if (gameSpeed) {
    switch (event.key) {
      case "ArrowRight":
        direction = "right";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
      default:
        break;
    }
  }
  if (!gameStarted && event.key == " ") {
    gameStarted = true;
    logo.style.display = "none";
    instructionText.style.display = "none";
    interval = setInterval(() => {
      move();
      draw();
      checkCollision();
    }, gameSpeed);
  }
}

document.addEventListener("keydown", keySelected);
