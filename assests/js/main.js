var btnRestart = document.getElementById("btnRestart");
var lblScore = document.querySelector('.score');
var gmCvs = document.getElementById("game-area");
var cntxt = gmCvs.getContext("2d");
const scale = 16;
const spScale = 20;
const areaRows = gmCvs.height / scale;
const areaColumns = gmCvs.width / scale;
const spAreaRows = gmCvs.height / spScale;
const spAreaColumns = gmCvs.width / spScale;
var snake;
var scores = [];
var currDirection = '';
var gameFunc = undefined;

this.setUp = function () {
    scores.unshift(0);
    snake = new Snake();
    fruit = new Fruit();
    fruit.updatePos();
    fruit.render(false);
    btnRestart.hidden = true;
    currDirection = 'Left';
}

this.game = function () {
    this.clearCanvas();
    fruit.render();
    snake.updatePos();
    snake.render();

    if (snake.eat(fruit)) {
        scores[0] += fruit.isSpecial ? 9 : 1;
        fruit.isSpecial = scores[0] > 0 && (scores[0] % 3) == 0;
        fruit.updatePos();
    }

    if (snake.isCollision()) {
        this.clearCanvas();
        cntxt.fillStyle = "black";
        cntxt.font = "22px Arial";
        const msg = 'Game Over';
        cntxt.fillText(msg, gmCvs.width / 2 - (cntxt.measureText(msg).width / 2), 50);
        btnRestart.hidden = false;
        gameFunc = this.undefined;
    }


    this.lblScore.style.color = 'white';
    if (scores.length > 1) {
        let oldMxScore = scores.slice(1, scores.length)
            .reduce(function (a, b) {
                return Math.max(a, b);
            });
        if (oldMxScore < scores[0]) {
            this.lblScore.style.color = 'greenyellow';
        }
    }
    lblScore.innerText = 'Score: ' + scores[0];
};

this.clearCanvas = function () {
    cntxt.clearRect(0, 0, gmCvs.width, gmCvs.height);
    cntxt.fillStyle = "white";
    cntxt.fillRect(0, 0, gmCvs.width, gmCvs.height);
};

window.addEventListener('keydown', ((evt) => {
    if (!gameFunc) { return; }
    if (!evt.key.includes('Arrow')) { return; }

    var direction = evt.key.replace('Arrow', '');
    if (currDirection === direction) { return; }

    if ((direction == 'Right' && currDirection != 'Left')
        || (direction == 'Down' && currDirection != 'Up')
        || (direction == 'Left' && currDirection != 'Right')
        || (direction == 'Up' && currDirection != 'Down')) {
        snake.changeDirection(direction);
        currDirection = direction;
    }
}));

this.startGame = function () {
    this.setUp();
    gameFunc = window.setInterval(() => {
        this.game();
    }, 150)
};

this.startGame();