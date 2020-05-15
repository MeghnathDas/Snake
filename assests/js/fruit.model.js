function Fruit() {
  this.xPos;
  this.yPos;
  this.spXPos;
  this.spYPos;
  this.expiryIntervalFunc = undefined;
  this.isSpecial = false;

  this.updatePos = function () {
    this.xPos = (Math.floor(Math.random() *
      areaColumns - 1) + 1) * scale;
    this.yPos = (Math.floor(Math.random() *
      areaRows - 1) + 1) * scale;

    this.spXPos = (Math.floor(Math.random() *
      spAreaColumns - 1) + 1) * spScale;
    this.spYPos = (Math.floor(Math.random() *
      spAreaRows - 1) + 1) * spScale;

    let expTimeInSec = Math.floor(Math.random() * (11 - 4) + 4);
    if (this.isSpecial) {
      expTimeInSec = Math.floor(Math.random() * (6 - 1) + 1);
    }
    this.setExpiry(expTimeInSec);
  }

  this.render = function () {
    if (this.isSpecial) {
      cntxt.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
      cntxt.fillRect(this.xPos, this.yPos, spScale, spScale);
      // cntxt.arc(this.xPos, this.yPos, scale, 0, 2 * Math.PI, true);
    } else {
      cntxt.fillStyle = "blue";
      cntxt.fillRect(this.xPos, this.yPos, scale, scale);
    }
  }

  this.setExpiry = function (timeInSec) {
    if (this.expiryIntervalFunc) { clearInterval(this.expiryIntervalFunc); }

    this.expiryIntervalFunc = window.setInterval(() => {
      this.updatePos();
      // this.isSpecial = false;
    }, timeInSec * 1000);
  }
}