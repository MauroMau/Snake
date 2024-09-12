const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');

const gridSize = 20;
const canvasSize = 400;

let snake = [{ x: 200, y: 200 }];
let snakeDirection = 'RIGHT';
let food = { x: 100, y: 100 };
let score = 0;
let gameInterval;

const snakeImage = new Image();
snakeImage.src = 'images/snake.png'; // Pfad zu deinem Schlangenbild

const foodImage = new Image();
foodImage.src = 'images/food.png'; // Pfad zu deinem Futterbild

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => {
        ctx.drawImage(snakeImage, segment.x, segment.y, gridSize, gridSize);
    });
    drawFood();
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (snakeDirection) {
        case 'UP': head.y -= gridSize; break;
        case 'DOWN': head.y += gridSize; break;
        case 'LEFT': head.x -= gridSize; break;
        case 'RIGHT': head.x += gridSize; break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    if (isCollision(head)) {
        clearInterval(gameInterval);
        alert(`Game Over! Punkte: ${score}`);
        resetGame();
    }
}

function changeDirection(event) {
    const { key } = event;
    if (key === 'ArrowUp' && snakeDirection !== 'DOWN') snakeDirection = 'UP';
    if (key === 'ArrowDown' && snakeDirection !== 'UP') snakeDirection = 'DOWN';
    if (key === 'ArrowLeft' && snakeDirection !== 'RIGHT') snakeDirection = 'LEFT';
    if (key === 'ArrowRight' && snakeDirection !== 'LEFT') snakeDirection = 'RIGHT';
}

function isCollision(head) {
    return head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function drawFood() {
    ctx.drawImage(foodImage, food.x, food.y, gridSize, gridSize);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

function startGame() {
    clearInterval(gameInterval);
    resetGame();
    gameInterval = setInterval(() => {
        moveSnake();
        drawSnake();
    }, 200);
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    snakeDirection = 'RIGHT';
    score = 0;
    scoreDisplay.textContent = score;
    generateFood();
}

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);
