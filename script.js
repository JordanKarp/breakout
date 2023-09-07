

let canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d'),
    ballRadius = 9.,
    x = Math.floor(Math.random() * canvas.width),
    y = canvas.height - 40, 
    dx = 2,
    dy = -2

let paddleHeight = 12, 
    paddleWidth = 72

let paddleX = (canvas.width - paddleWidth) / 2;

let rowCount = 5,
    colCount = 9, 
    brickWidth = 54,
    brickHeight = 18, 
    brickPadding = 12,
    topOffset = 40,
    leftOffset = 33, 
    score = 0

let bricks = []
for (let col = 0; col < colCount; col++){
    bricks[col] = [];
    for (let row = 0; row < rowCount; row++){
        bricks[col][row] = { x:0, y:0, status:1}
    }
}

document.addEventListener('mousemove', mouseMoveHandler, false)

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawPaddle(){
    ctx.beginPath()
    ctx.roundRect(paddleX, canvas.height- paddleHeight, paddleWidth, paddleHeight, 30)
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.closePath()
}

function drawBall(){
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.closePath()
}

function drawBricks(){
    for (let col = 0; col < colCount; col++){
        for (let row = 0; row < rowCount; row++){
            if (bricks[col][row].status===1) {
                let brickX = (col * (brickWidth + brickPadding)) + leftOffset
                let brickY = (row * (brickHeight + brickPadding)) + topOffset
                bricks[col][row].x = brickX
                bricks[col][row].y = brickY
                ctx.beginPath()
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30)
                ctx.fillStyle = '#5a5a5a'
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}


function trackScore() {
    ctx.font='bold 1rem sans-serif'
    ctx.fillStyle = '#333'
    ctx.fillText('Score: ' + score, 8, 24)
}

function hitDetection(){
    for (let col = 0; col < colCount; col++){
        for (let row = 0; row < rowCount; row++){
            let b = bricks[col][row]
            if (b.status === 1 && (x > b.x && 
                                x < b.x+ brickWidth &&
                                y > b.y && 
                                y < b.y + brickHeight)) {
                  dy = -dy;
                  b.status = 0;
                  score++;
                  if (score === rowCount * colCount) {
                      alert('You win!');
                      document.location.reload()
                  }
            }
        }
    }
}

function init() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    trackScore()
    drawBricks()
    drawBall()
    drawPaddle()
    hitDetection()

    if (x+ dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius){
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("Game Over");
            document.location.reload();
        }
    }

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }

    x += dx;
    y += dy;
}

setInterval(init,10)