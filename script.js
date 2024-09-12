const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');

let snake = [{ x: 200, y: 200 }];
let snakeDirection = 'RIGHT';
let food = { x: 100, y: 100 };
let score = 0;
let gameInterval;

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
    drawFood();
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (snakeDirection) {
        case 'UP':
            head.y -= 20;
            break;
        case 'DOWN':
            head.y += 20;
            break;
        case 'LEFT':
            head.x -= 20;
            break;
        case 'RIGHT':
            head.x += 20;
            break;
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
        alert('Game Over! Punkte: ' + score);
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
    return head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
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
