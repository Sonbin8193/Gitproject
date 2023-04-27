/**
 * Created by nhatnk on 4/26/17.
 * Update
 */

class Hero {
  constructor (image, top, left, size){
  this.image = image;
  this.top = top;
  this.left = left;
  this.size = size;
  }

  getHeroElement = function (){
    return '<img width="'+ this.size + '"' +
      ' height="'+ this.size + '"' +
      ' src="' + this.image +'"' +
      ' style="top: '+this.top+'px; left:'+this.left+'px;position:absolute;" />';
  }

  moveRight = function (){
    this.left += 1;
    console.log('ok: ' + this.left);
  }

  moveDown = function () {
    this.top +=1
  }

  moveLeft = function () {
    this.left -=1
  }

  moveUp = function () {
    this.top -=1
  }
}

let right = new Hero('right.png', 0, 0, 200);
let down = new Hero('down.png', 20, 30, 200);
let left = new Hero('left.png', 20, 30, 200);
let up = new Hero('up.png', 20, 30, 200);

let direction = 0;
function start(){
  if( direction == 0 && right.left < window.innerWidth - right.size){
    right.moveRight();
    down.moveRight();
    left.moveRight();
    up.moveRight();
    document.getElementById('game').innerHTML = right.getHeroElement();
  } else {
    if (direction == 0 && down.top < window.innerHeight - down.size) {
      down.moveDown();
      left.moveDown();
      up.moveDown();
      document.getElementById('game').innerHTML = down.getHeroElement();
    } else {
      direction = 1;
      if(direction==1 && left.left > 0){
      left.moveLeft();
      up.moveLeft();
      document.getElementById('game').innerHTML = left.getHeroElement();
      } else {
        if (direction==1 && up.top > 0) {
          up.moveUp();
          document.getElementById('game').innerHTML = up.getHeroElement();
        } else {
          direction = 0;
        }
      }
    } 
  }
  
  //setTimeout(start, 100) // => Mỗi 0,1s thì gọi hàm start 1 lần
  return direction;
}

start();
// Cứ 500s thì 
setInterval(start,1);