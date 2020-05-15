function Snake() {
    this.xPos = 0;
    this.yPos = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.blocks = [];
    this.bodyLength = 0;

    this.render = function () {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i]) {
                cntxt.fillStyle = '#060a8c';
                cntxt.fillRect(this.blocks[i].xPos, this.blocks[i].yPos, scale, scale);
                cntxt.strokeStyle = 'white';
                cntxt.strokeRect(this.blocks[i].xPos, this.blocks[i].yPos, scale, scale);
            }
        }

        cntxt.fillStyle = 'black';
        cntxt.fillRect(this.xPos, this.yPos, scale, scale);
    }

    this.updatePos = function () {
        for (let i = 0; i < this.blocks.length - 1; i++) {
            this.blocks[i] = this.blocks[i + 1];
        }
        var isIncrementNeeded = true;
        for (let i = this.blocks.length - 1; i < this.bodyLength; i++) {
            this.blocks[i] = { xPos: this.xPos, yPos: this.yPos };
            this.checkSnakePos();
            isIncrementNeeded = false;
        }

        if (isIncrementNeeded) {
            this.checkSnakePos();
        }

    }
    this.checkSnakePos = function () {
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;

        if (this.xPos >= gmCvs.width) {
            this.xPos = 0;
        }

        if (this.yPos >= gmCvs.height) {
            this.yPos = 0;
        }

        if (this.xPos < 0) {
            this.xPos = gmCvs.width;
        }

        if (this.yPos < 0) {
            this.yPos = gmCvs.height;
        }
    }

    this.changeDirection = function (direction) {
        switch (direction) {
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = -scale * 1;
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = scale * 1;
                break;
            case 'Left':
                this.xSpeed = -scale * 1;
                this.ySpeed = 0;
                break;
            case 'Right':
                this.xSpeed = scale * 1;
                this.ySpeed = 0;
                break;
        }
    }

    this.eat = function (fruit) {
        if (fruit.isSpecial) {
            const msrFact = ((spScale - scale) / 2);
            if ((this.xPos == fruit.xPos) &&
                (this.yPos == fruit.yPos)) {
                this.bodyLength += 2;
                return true;
            }
        } else {
            if (this.xPos === fruit.xPos &&
                this.yPos === fruit.yPos) {
                this.bodyLength++;
                return true;
            }
        }
        return false;
    }

    this.isCollision = function () {
        for (var i = 0; i < this.blocks.length; i++) {
            try {
                if (this.xPos === this.blocks[i].xPos &&
                    this.yPos === this.blocks[i].yPos) {
                    this.bodyLength = 0;
                    this.blocks = [];                    
                    clearInterval(gameFunc);
                    return true;
                }
            }
            catch (err) {
                console.log(this.blocks);
                console.log(i);
                console.log(err);
                break;
            }
        }
    }
}
