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
        this.fallingBrick = [];
        this.landBrick = [];
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
        random = Math.round(Math.random()*6); // => chỉnh rơi brick
        this.displayFallBrick(random);
        return random;
    }
    // Lấy dữ liệu vị trí ô gạch xuất hiện
    getDataFallingBrick() {
        for (const idxY in this.dataBoard) {
            for (const idxX in this.dataBoard[idxY]) {
                if (this.dataBoard[idxY][idxX].status != -1) {
                this.fallingBrick.push(this.dataBoard[idxY][idxX]);
                }
            }  
        }
        return this.fallingBrick;
    }
    // Lấy dữ liệu vị trí ô gạch rơi xuống thành công
    getDataLandBrick() {
        for (const idx in this.fallingBrick) {
            this.landBrick.push(this.fallingBrick[idx]);
        }
        for (const idx in this.landBrick) {
            switch (this.landBrick[idx].status) {
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
            this.drawLandBrick();
        }
        this.fallingBrick = [];
        return this.landBrick;
    }
    //Vẽ ô gạch random lượt sắp tới
    drawNextBrick(random) {
        if (random == 0) {
            // Lấy thông tin brick để hiển thị ra bảng chơi game
            this.dataBoard[0][4].status = 0;
            this.dataBoard[1][3].status = 0;
            this.dataBoard[1][4].status = 0;
            this.dataBoard[1][5].status = 0;
            this.getDataFallingBrick();
            this.nextBrick = 'arrow';
            ctx.fillStyle = "red";
            // Vẽ brick turn sắp tới
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 2*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 1) {
            this.dataBoard[0][3].status = 1;
            this.dataBoard[0][4].status = 1;
            this.dataBoard[1][3].status = 1;
            this.dataBoard[1][4].status = 1;
            this.getDataFallingBrick();
            this.nextBrick = 'square';
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 2) {
            this.dataBoard[0][3].status = 2;
            this.dataBoard[0][4].status = 2;
            this.dataBoard[1][3].status = 2;
            this.dataBoard[2][3].status = 2;
            this.getDataFallingBrick();
            this.nextBrick = 'rightL';
            ctx.fillStyle = "violet";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 2*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 3) {
            this.dataBoard[0][4].status = 3;
            this.dataBoard[1][4].status = 3;
            this.dataBoard[2][4].status = 3;
            this.dataBoard[3][4].status = 3;
            this.getDataFallingBrick();
            this.nextBrick = 'line';
            ctx.fillStyle = "blue";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 2*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 3*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 4) {
            this.dataBoard[0][3].status = 4;
            this.dataBoard[0][4].status = 4;
            this.dataBoard[1][4].status = 4;
            this.dataBoard[2][4].status = 4;
            this.getDataFallingBrick();
            this.nextBrick = 'leftL';
            ctx.fillStyle = "green";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 2*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 5) {
            this.dataBoard[0][3].status = 5;
            this.dataBoard[0][4].status = 5;
            this.dataBoard[1][4].status = 5;
            this.dataBoard[1][5].status = 5;
            this.getDataFallingBrick();
            this.nextBrick = 'rightZ';
            ctx.fillStyle = "orange";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 2*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        if (random == 6) {
            this.dataBoard[0][4].status = 6;
            this.dataBoard[0][5].status = 6;
            this.dataBoard[1][4].status = 6;
            this.dataBoard[1][3].status = 6;
            this.getDataFallingBrick();
            this.nextBrick = 'leftZ';
            ctx.fillStyle = "pink";
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 2*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 0*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 1*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
            ctx.fillRect(this.leftNoticeBoard + SPACE + 0*(SPACE+BRICK_MINI),this.topNoticeBoard+SPACE+ 1*(SPACE+BRICK_MINI),BRICK_MINI,BRICK_MINI);
        }
        this.makeDataBoard();
        console.log(`Next Brick: ${this.nextBrick}`);
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
    //Vẽ ô gạch đang rơi
    drawFallBrick() {
        for (const idx in this.fallingBrick) {
            if (this.fallingBrick[idx].y > -1) {
                ctx.fillRect(this.left+SPACE+this.fallingBrick[idx].x*(SPACE+BRICK_SIZE),this.top+SPACE+ this.fallingBrick[idx].y*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
            }
        } 
    }
    // Hiển thị ô gạch đang rơi
    displayFallBrick(random) {
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
            default:
                ctx.fillStyle = "#D3D3D3";
                break;
        }
        this.drawFallBrick(); 
    }
    // Vẽ ô gạch đã hạ cánh
    drawLandBrick() {
        for (const idx in this.landBrick) {
                ctx.fillRect(this.left+SPACE+this.landBrick[idx].x*(SPACE+BRICK_SIZE),this.top+SPACE+ this.landBrick[idx].y*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
        } 
    }
    // Hiển thị ô gạch đã hạ cánh
    displayLandBrick() {
        for (const idx in this.landBrick) {
            switch (this.landBrick[idx].status) {
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
            this.drawLandBrick();
        } 
    }
    // Brick rơi tự do ( Nhấn mũi tên xuống sẽ rơi nhanh hơn gấp đôi)
    autoDownBrick() {
        for (const idx in this.fallingBrick) {
                this.fallingBrick[idx].y += 1;
        }
        this.drawBoard();
        this.displayFallBrick(random);
    }
    // Dịch brick sang trái ( dùng nút mũi tên sang trái)
    moveLeftBrick() { 
        for (const idx in this.fallingBrick) {
                this.fallingBrick[idx].x -= 1;
        }
    this.drawBoard();
    this.displayFallBrick(random);
    }
    // Dịch brick sang phải ( dùng nút mũi tên sang phải)
    moveRightBrick() {
        for (const idx in this.fallingBrick) {
                this.fallingBrick[idx].x += 1;
        }
    this.drawBoard();
    this.displayFallBrick(random);
    }
    //xoay Brick
    rolateBrick() {
        for (const idx in this.fallingBrick) {
            if (this.fallingBrick[idx].x == this.fallingBrick[2].x && this.fallingBrick[idx].y == this.fallingBrick[2].y ) {
                continue;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x && this.fallingBrick[idx].y == this.fallingBrick[2].y -1) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x + 1;
                this.fallingBrick[idx].y = this.fallingBrick[2].y; 
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x && this.fallingBrick[idx].y == this.fallingBrick[2].y -2) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x + 2;
                this.fallingBrick[idx].y = this.fallingBrick[2].y; 
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x + 1 && this.fallingBrick[idx].y == this.fallingBrick[2].y -1) {
                this.fallingBrick[idx].y = this.fallingBrick[2].y + 1;  
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x + 1 && this.fallingBrick[idx].y == this.fallingBrick[2].y) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x;
                this.fallingBrick[idx].y = this.fallingBrick[2].y + 1; 
            } else if(this.fallingBrick[idx].x == this.fallingBrick[2].x + 2 && this.fallingBrick[idx].y == this.fallingBrick[2].y) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x;
                this.fallingBrick[idx].y = this.fallingBrick[2].y + 2; 
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x +1  && this.fallingBrick[idx].y == this.fallingBrick[2].y +1) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x -1;  
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x && this.fallingBrick[idx].y == this.fallingBrick[2].y +1) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x - 1;
                this.fallingBrick[idx].y = this.fallingBrick[2].y;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x && this.fallingBrick[idx].y == this.fallingBrick[2].y +2) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x - 2;
                this.fallingBrick[idx].y = this.fallingBrick[2].y;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x -1&& this.fallingBrick[idx].y == this.fallingBrick[2].y +1) {
                this.fallingBrick[idx].y = this.fallingBrick[2].y -1;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x -1 && this.fallingBrick[idx].y == this.fallingBrick[2].y) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x;
                this.fallingBrick[idx].y = this.fallingBrick[2].y -1;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x -2 && this.fallingBrick[idx].y == this.fallingBrick[2].y) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x;
                this.fallingBrick[idx].y = this.fallingBrick[2].y -2;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x -1 && this.fallingBrick[idx].y == this.fallingBrick[2].y -1) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x +1;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x +2 && this.fallingBrick[idx].y == this.fallingBrick[2].y -1) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x +1;
                this.fallingBrick[idx].y = this.fallingBrick[2].y +2;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x +1 && this.fallingBrick[idx].y == this.fallingBrick[2].y +2) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x -2;
                this.fallingBrick[idx].y = this.fallingBrick[2].y +1;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x -2 && this.fallingBrick[idx].y == this.fallingBrick[2].y +1) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x -1;
                this.fallingBrick[idx].y = this.fallingBrick[2].y -2;
            } else if (this.fallingBrick[idx].x == this.fallingBrick[2].x -1 && this.fallingBrick[idx].y == this.fallingBrick[2].y -2) {
                this.fallingBrick[idx].x = this.fallingBrick[2].x +2;
                this.fallingBrick[idx].y = this.fallingBrick[2].y -1;
            }
        }
        this.drawBoard();
        this.displayFallBrick(random);
    }
    clearBrick() {};
    earnScore() {};
}
let newGame = new GameBoard(25,10);
newGame.makeDataBoard();
newGame.drawBoard();
let random;
let a=1;
newGame.makeRandomBrick();
console.log(`Số random: ${random}`);
newGame.noticeNextBrick();
//let downBrick = setInterval(autoDown,250);
console.log(`LandingBrick Data: ${newGame.fallingBrick}`)
console.log(`LandBrick Data: ${newGame.landBrick}`);
function autoDown() {
    newGame.autoDownBrick();
    if (newGame.fallingBrick[0].y == 19 || newGame.fallingBrick[1].y == 19 || newGame.fallingBrick[2].y == 19 || newGame.fallingBrick[3].y == 19) {
        //stopAutoDown();
        a++;
        console.log(`Dừng lần ${a}`);
        newGame.getDataLandBrick();
        //newGame.fallingBrick = [];
        newGame.makeRandomBrick();
        console.log(`Số random: ${random}`);
        newGame.noticeNextBrick();
    }
    setTimeout(autoDown,500);
}
autoDown();

onkeydown = function(evt) {
    switch (evt.keyCode) {
        case 37:
            if (newGame.fallingBrick[0].x != 0 && newGame.fallingBrick[1].x != 0 && newGame.fallingBrick[2].x != 0 && newGame.fallingBrick[3].x != 0 ) {
                newGame.moveLeftBrick();
                console.log(newGame.fallingBrick[1].x);
            }
            break;
        case 38:
            if (newGame.fallingBrick[0].y < 20 || newGame.fallingBrick[1].y < 20 || newGame.fallingBrick[2].y < 20 || newGame.fallingBrick[3].y < 20) {
                newGame.rolateBrick();
            }
            break;
        case 39:
            if (newGame.fallingBrick[0].x != 9 && newGame.fallingBrick[1].x != 9 && newGame.fallingBrick[2].x != 9 && newGame.fallingBrick[3].x != 9 ) {
                newGame.moveRightBrick();
                console.log(newGame.fallingBrick[1].x);
            }
            break;
        case 40:
            stopAutoDown();
            let downBrickFast = setInterval(moveDown,30);
            function moveDown() {
            newGame.autoDownBrick();
            for (const idx in newGame.fallingBrick) {
                if (newGame.fallingBrick[idx].y == newGame.dataBoard[24][0].y) {
                    stopDown();
                    newGame.getDataLandBrick();
                }
            }
            }
            function stopDown() {
            clearInterval(downBrickFast);
            }
            break;
        default:
            break;
        }
}