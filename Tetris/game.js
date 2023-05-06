const BRICK_SIZE = 35;
const BRICK_MINI = 25
const SPACE = 5;
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

class GameBoard {
    constructor(row, col) {
        this.left = 200;
        this.top = 50
        this.col = col;
        this.row = row;
        this.width = SPACE + this.col*(SPACE+BRICK_SIZE);
        this.height = SPACE + (this.row - 5)*(SPACE+BRICK_SIZE);
        this.dataBoard = [];
        this.landingBrick = [];
        this.brick = null;
        this.nextBrick = null;
        this.score = 0;
        this.leftNoticeBoard = 50 + this.left + SPACE + this.col*(SPACE+BRICK_SIZE);
        this.topNoticeBoard = (45 + this.left + SPACE + this.row*(SPACE+BRICK_SIZE))/3;
    }

    makeDataBoard() {
        for (let i = 0; i < this.row; i++) {
            this.dataBoard[i] = [];
            for (let j = 0; j < this.col; j++) {
               this.dataBoard[i][j] = {
                x: i,
                y: j,
                status: -1
               };
            }
        }
        return this.dataBoard;
    }
    drawBoard() {
        ctx.strokeRect(this.left,this.top,this.width,this.height);
        ctx.stroke();
        for (let i = 5; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                ctx.fillStyle = "#D3D3D3";
                ctx.fillRect(this.left + SPACE + j*(SPACE+BRICK_SIZE),this.top+SPACE+(i-5)*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            }         
        }
    }

    getDataLandingBrick(random) {
        for (const idxY in this.dataBoard) {
            for (const idxX in this.dataBoard) {
               if (this.dataBoard[idxY][idxX].status != -1) {
                this.landingBrick.push(this.dataBoard[idxY][idxX]);
                this.dataBoard[idxY][idxX].status = -1;
               }
            }  
        }
    }
    drawNextBrick(random) {
        if (random == 0) {
            this.nextBrick = 'square';
            ctx.fillStyle = "red";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 1) {
            this.nextBrick = 'arrow';
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 2*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 2) {
            this.nextBrick = 'rightL';
            ctx.fillStyle = "violet";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 2*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 3) {
            this.nextBrick = 'line';
            ctx.fillStyle = "blue";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 2*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 3*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 4) {
            this.nextBrick = 'leftL';
            ctx.fillStyle = "green";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 2*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 5) {
            this.nextBrick = 'rightZ';
            ctx.fillStyle = "orange";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 2*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 6) {
            this.nextBrick = 'leftZ';
            ctx.fillStyle = "pink";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 2*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        console.log(`Next Brick: ${this.nextBrick}`);
        this.getDataLandingBrick(random);
    }
    drawBrick(random) {
        if (random == 0) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.left+SPACE+4*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left+SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left+SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left+SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
        }
        if (random == 1) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 3*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
        }
        if (random == 2) {
            ctx.fillStyle = "violet";
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 2*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
        }
        if (random == 3) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 2*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 3*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
        }
        if (random == 4) {
            ctx.fillStyle = "green";
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 2*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
        }
        if (random == 5) {
            ctx.fillStyle = "orange";
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 6*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
        }
        if (random == 6) {
            ctx.fillStyle = "pink";
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 5*(SPACE+BRICK_SIZE),this.top+SPACE+ 0*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 4*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            ctx.fillRect(this.left + SPACE + 3*(SPACE+BRICK_SIZE),this.top+SPACE+ 1*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
        }
    }
    makeRandomBrick() {
        random = Math.round(Math.random()*0); // => chỉnh rơi brick
        this.drawBrick(random);
        return random;
    }
    noticeNextBrick() {
        ctx.strokeRect (this.leftNoticeBoard,this.topNoticeBoard, SPACE+3*(SPACE+BRICK_MINI), SPACE+4*(SPACE+BRICK_MINI))
        ctx.stroke();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
            ctx.beginPath();
                ctx.fillStyle = "#D3D3D3";
                ctx.fillRect(5+this.leftNoticeBoard + j*(SPACE+BRICK_MINI),5 + this.topNoticeBoard + i*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            }         
        }
        this.drawNextBrick(random);
    }
    
    moveBrick() {
        for (const idxY in this.landingBrick) {
                this.landingBrick[idxY][idxY].y += 1;

        }
    }
    rolateBrick() {}
    clearBrick() {}
    speedUpBrick() {}
    earnScore() {}
}
let newGame = new GameBoard(25,10);
newGame.makeDataBoard();
newGame.drawBoard();
let random;
newGame.makeRandomBrick();
newGame.noticeNextBrick();
console.log(newGame.dataBoard,newGame.landingBrick);