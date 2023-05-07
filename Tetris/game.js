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
    // Tạo dữ liệu màn chơi
    makeDataBoard() {
        for (let i = 0; i < this.row; i++) {
            this.dataBoard[i] = [];
            for (let j = 0; j < this.col; j++) {
               this.dataBoard[i][j] = {
                y: i-5,
                x: j,
                status: -1
               };
            }
        }
        return this.dataBoard;
    }
    //Vẽ màn chơi
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
    // Vẽ ô gạch random
    makeRandomBrick() {
        random = Math.round(Math.random()*0); // => chỉnh rơi brick
        this.displayBrick(random);
        return random;
    }
    // Lấy dữ liệu vị trí ô gạch xuất hiện
    getDataLandingBrick() {
        for (const idxY in this.dataBoard) {
            for (const idxX in this.dataBoard[idxY]) {
                if (this.dataBoard[idxY][idxX].status != -1) {
                this.landingBrick.push(this.dataBoard[idxY][idxX]);
                this.dataBoard[idxY][idxX].status = -1;
                }
            }  
        }
    }
    //Vẽ ô gạch random lượt sắp tới
    drawNextBrick(random) {
        if (random == 0) {
            // Lấy thông tin brick để hiển thị ra bảng chơi game
            this.dataBoard[0][4].status = 0;
            this.dataBoard[1][3].status = 0;
            this.dataBoard[1][4].status = 0;
            this.dataBoard[1][5].status = 0;
            this.getDataLandingBrick();
            this.nextBrick = 'arrow';
            ctx.fillStyle = "red";
            // Vẽ brick turn sắp tới
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 2*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 1) {
            this.nextBrick = 'square';
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
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
        return this.landingBrick;
    }
    //Hiển thị khung thông báo ô gạch lượt tới
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
    //Vẽ ô gạch
    drawBrick() {
        for (const idx in this.landingBrick) {
            if (this.landingBrick[idx].y > -1) {
                ctx.fillRect(this.left+SPACE+this.landingBrick[idx].x*(SPACE+BRICK_SIZE),this.top+SPACE+ this.landingBrick[idx].y*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            }
        } 
    }
    // Hiển thị ô gạch
    displayBrick(random) {
        switch (random) {
            case 0:
                ctx.fillStyle = "red";
                break;
                case 1:
                ctx.fillStyle = "yellow";
                break;
                case 2:
                ctx.fillStyle = "violet";
                break;
                case 3:
                ctx.fillStyle = "blue";
                break;
                case 4:
                ctx.fillStyle = "green";
                break;
                case 5:
                ctx.fillStyle = "orange";
                break;
                case 6:
                ctx.fillStyle = "pink";
                break;
        }
        this.drawBrick(); 
    }
    // Brick rơi tự do ( Nhấn mũi tên xuống sẽ rơi nhanh hơn gấp đôi)
    autoDownBrick() {
        for (const idx in this.landingBrick) {
                this.landingBrick[idx].y += 1;
        }
        this.drawBoard();
        this.displayBrick(random);
    }
    // Dịch brick sang trái ( dùng nút mũi tên sang trái)
    moveLeftBrick() { 
        for (const idx in this.landingBrick) {
                this.landingBrick[idx].x -= 1;
        }
    this.drawBoard();
    this.displayBrick(random);
    }
    // Dịch brick sang phải ( dùng nút mũi tên sang phải)
    moveRightBrick() {
        for (const idx in this.landingBrick) {
                this.landingBrick[idx].x += 1;
        }
    this.drawBoard();
    this.displayBrick(random);
    }
    rolateBrick() {};
    clearBrick() {};
    speedUpBrick() {};
    earnScore() {};
}
let newGame = new GameBoard(25,10);
newGame.makeDataBoard();
newGame.drawBoard();
let random;
newGame.makeRandomBrick();
newGame.noticeNextBrick();
console.log(newGame.dataBoard,newGame.landingBrick);
newGame.displayBrick(random);
let downBrick = setInterval(autoDown,500);
function autoDown() {
    newGame.autoDownBrick();
    for (const idx in newGame.landingBrick) {
        if (newGame.landingBrick[idx].y == newGame.dataBoard[24][0].y) {
            stopDown();
        }
    }
}
function stopDown() {
    clearInterval(downBrick);
}
function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            if (newGame.landingBrick[0].x != 0 && newGame.landingBrick[1].x != 0 && newGame.landingBrick[2].x != 0 && newGame.landingBrick[3].x != 0 ) {
                newGame.moveLeftBrick();
                console.log(newGame.landingBrick[1].x);
            }
            break;
        case 39:
            newGame.moveRightBrick();
            break;
    }
}
function doReady() {
    canvas.addEventListener('keydown', moveSelection);
}
