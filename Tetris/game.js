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
        this.fallBrick = [];
        this.landBrick = [];
        this.breakBrick = 1;
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
    getDataFallBrick() {
        for (const idxY in this.dataBoard) {
            for (const idxX in this.dataBoard[idxY]) {
                if (this.dataBoard[idxY][idxX].status != -1) {
                this.fallBrick.push(this.dataBoard[idxY][idxX]);
                }
            }  
        }
        return this.fallBrick;
    }
    // Lấy dữ liệu vị trí ô gạch rơi xuống thành công
    getDataLandBrick() {
        for (const idx in this.fallBrick) {
            this.landBrick.push(this.fallBrick[idx]);
        }
        this.fallBrick = [];
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
            this.getDataFallBrick();
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
            this.getDataFallBrick();
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
            this.getDataFallBrick();
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
            this.getDataFallBrick();
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
            this.getDataFallBrick();
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
            this.getDataFallBrick();
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
            this.getDataFallBrick();
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
        for (const idx in this.fallBrick) {
            if (this.fallBrick[idx].y > -1) {
                if (this.fallBrick[idx].x>-1 && this.fallBrick[idx].x <this.col) {
                    ctx.fillRect(this.left+SPACE+this.fallBrick[idx].x*(SPACE+BRICK_SIZE),this.top+SPACE+ this.fallBrick[idx].y*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
                }
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
            ctx.fillRect(this.left+SPACE+this.landBrick[idx].x*(SPACE+BRICK_SIZE),this.top+SPACE+ this.landBrick[idx].y*(SPACE+BRICK_SIZE),BRICK_SIZE,BRICK_SIZE);
        } 
    }
    // Brick rơi tự do ( Nhấn mũi tên xuống sẽ rơi nhanh hơn gấp đôi)
    autoDownBrick() {
        for (const idx in this.fallBrick) {
                this.fallBrick[idx].y += 1;
        }
        this.drawBoard();
        this.displayFallBrick(random);
        this.displayLandBrick();
    }
    // Dịch brick sang trái ( dùng nút mũi tên sang trái)
    moveLeftBrick() { 
        for (const idx in this.fallBrick) {
                this.fallBrick[idx].x -= 1;
        }
    this.drawBoard();
    this.displayFallBrick(random);
    this.displayLandBrick();
    }
    // Dịch brick sang phải ( dùng nút mũi tên sang phải)
    moveRightBrick() {
        for (const idx in this.fallBrick) {
                this.fallBrick[idx].x += 1;
        }
    this.drawBoard();
    this.displayFallBrick(random);
    this.displayLandBrick();
    }
    //xoay Brick
    rolateBrick() {
        for (const idx in this.fallBrick) {
            if (this.fallBrick[idx].x < 0) {
                this.moveRightBrick();
            }
            if (this.fallBrick[idx].x > this.col-1) {
                this.moveLeftBrick();
            }
            if (this.fallBrick[idx].x == this.fallBrick[2].x && this.fallBrick[idx].y == this.fallBrick[2].y ) {
                continue;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x && this.fallBrick[idx].y == this.fallBrick[2].y -1) {
                this.fallBrick[idx].x = this.fallBrick[2].x + 1;
                this.fallBrick[idx].y = this.fallBrick[2].y; 
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x && this.fallBrick[idx].y == this.fallBrick[2].y -2) {
                this.fallBrick[idx].x = this.fallBrick[2].x + 2;
                this.fallBrick[idx].y = this.fallBrick[2].y; 
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x + 1 && this.fallBrick[idx].y == this.fallBrick[2].y -1) {
                this.fallBrick[idx].y = this.fallBrick[2].y + 1;  
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x + 1 && this.fallBrick[idx].y == this.fallBrick[2].y) {
                this.fallBrick[idx].x = this.fallBrick[2].x;
                this.fallBrick[idx].y = this.fallBrick[2].y + 1; 
            } else if(this.fallBrick[idx].x == this.fallBrick[2].x + 2 && this.fallBrick[idx].y == this.fallBrick[2].y) {
                this.fallBrick[idx].x = this.fallBrick[2].x;
                this.fallBrick[idx].y = this.fallBrick[2].y + 2; 
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x +1  && this.fallBrick[idx].y == this.fallBrick[2].y +1) {
                this.fallBrick[idx].x = this.fallBrick[2].x -1;  
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x && this.fallBrick[idx].y == this.fallBrick[2].y +1) {
                this.fallBrick[idx].x = this.fallBrick[2].x - 1;
                this.fallBrick[idx].y = this.fallBrick[2].y;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x && this.fallBrick[idx].y == this.fallBrick[2].y +2) {
                this.fallBrick[idx].x = this.fallBrick[2].x - 2;
                this.fallBrick[idx].y = this.fallBrick[2].y;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x -1&& this.fallBrick[idx].y == this.fallBrick[2].y +1) {
                this.fallBrick[idx].y = this.fallBrick[2].y -1;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x -1 && this.fallBrick[idx].y == this.fallBrick[2].y) {
                this.fallBrick[idx].x = this.fallBrick[2].x;
                this.fallBrick[idx].y = this.fallBrick[2].y -1;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x -2 && this.fallBrick[idx].y == this.fallBrick[2].y) {
                this.fallBrick[idx].x = this.fallBrick[2].x;
                this.fallBrick[idx].y = this.fallBrick[2].y -2;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x -1 && this.fallBrick[idx].y == this.fallBrick[2].y -1) {
                this.fallBrick[idx].x = this.fallBrick[2].x +1;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x +2 && this.fallBrick[idx].y == this.fallBrick[2].y -1) {
                this.fallBrick[idx].x = this.fallBrick[2].x +1;
                this.fallBrick[idx].y = this.fallBrick[2].y +2;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x +1 && this.fallBrick[idx].y == this.fallBrick[2].y +2) {
                this.fallBrick[idx].x = this.fallBrick[2].x -2;
                this.fallBrick[idx].y = this.fallBrick[2].y +1;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x -2 && this.fallBrick[idx].y == this.fallBrick[2].y +1) {
                this.fallBrick[idx].x = this.fallBrick[2].x -1;
                this.fallBrick[idx].y = this.fallBrick[2].y -2;
            } else if (this.fallBrick[idx].x == this.fallBrick[2].x -1 && this.fallBrick[idx].y == this.fallBrick[2].y -2) {
                this.fallBrick[idx].x = this.fallBrick[2].x +2;
                this.fallBrick[idx].y = this.fallBrick[2].y -1;
            }
        }
        this.drawBoard();
        this.displayFallBrick(random);
        this.displayLandBrick();
    }
    moveDownLandBrick() {
        for (const idx in this.landBrick) {
                this.landBrick[idx].y +=1
        }
    }

    clearBrick() {
        if (this.landBrick.length >10) {
            console.log(`Bắt đầu check`);
            for (let j = 0; j < this.landBrick.length -8; j++) {
                for (let i = 0; i < 10; i++) {
                    if (this.landBrick[j].y != this.landBrick[j+i].y) {
                        console.log(`Check thất bại`);
                        this.breakBrick = 0;
                        break;
                    } else {
                        if (this.landBrick[j].status != -1 &&  this.landBrick[j+i].status != -1) {
                            this.breakBrick++;
                            console.log(`Kiểm tra liền kề ${this.breakBrick}`);
                            console.log(`Các ô liền kề ${this.landBrick[j+i]}`);
                        }
                    }
                }
                if (this.breakBrick == 10) {
                    this.breakBrick = 0;
                    this.landBrick.splice(j,10);
                    console.log(`Đã xoá hàng`);
                    this.moveDownLandBrick();
                    this.drawBoard();
                    this.displayFallBrick(random);
                    this.displayLandBrick();
                }
            }
        }
    }
    earnScore() {}
}
let newGame = new GameBoard(25,10);
newGame.makeDataBoard();
newGame.drawBoard();
let random;
let timeDelay = 500
let vaCham = false; // kiểm tra va chạm
newGame.makeRandomBrick();
console.log(`Số random: ${random}`);
newGame.noticeNextBrick();
console.log(`LandingBrick Data: ${newGame.fallBrick}`);
console.log(`LandBrick Data: ${newGame.landBrick}`);

// Kiểm tra Brick xoay vị vượt ra ngoài khung
function kiemTraNgoaiBien() {
    if (newGame.fallBrick[0].x < 0 || newGame.fallBrick[1].x < 0 || newGame.fallBrick[2].x < 0 || newGame.fallBrick[3].x < 0 ) {
        newGame.moveRightBrick();
        console.log ('Vượt giơi hạn, back sang phải')
    }
    if (newGame.fallBrick[0].x > newGame.col-1 || newGame.fallBrick[1].x > newGame.col-1 || newGame.fallBrick[2].x > newGame.col-1 || newGame.fallBrick[3].x > newGame.col-1 ) {
        newGame.moveLeftBrick();
        console.log ('Vượt giơi hạn, back sang trái')
    }
}
// Kiểm tra Brick đã chạm với các khối đã hạ cách chưa
function kiemTraVaCham () {
    vaCham = false;
    for (const idx in newGame.fallBrick) {
        for (const idx2 in newGame.landBrick) {
            if (newGame.fallBrick[idx].y == newGame.landBrick[idx2].y ) {
                if (newGame.fallBrick[idx].x == newGame.landBrick[idx2].x -1 || newGame.fallBrick[idx].x == newGame.landBrick[idx2].x +1) {
                        vaCham = true;
                        break;
                }
            }
        }
     }
    return vaCham;

}

function stopGame() {
    for (const idx in newGame.landBrick) {
        if (newGame.landBrick[idx].y == 0) {
            timeDelay = 0;
            ctx.font = "200px Georgia";
            ctx.fillText('Game Over', 300, 300);
        }
    }
}
function gameLoop() {
    kiemTraNgoaiBien();
    newGame.autoDownBrick();
    if (newGame.fallBrick[0].y == 19 || newGame.fallBrick[1].y == 19 || newGame.fallBrick[2].y == 19 || newGame.fallBrick[3].y == 19) {
        timeDelay = 500;
        stopGame();
        newGame.getDataLandBrick();
        newGame.clearBrick();
        newGame.makeRandomBrick();
        console.log(`Số random: ${random}`);
        newGame.noticeNextBrick();
    } else {
        for (const idx in newGame.fallBrick) {
            for (const idx2 in newGame.landBrick) {
                if (newGame.fallBrick[idx].x == newGame.landBrick[idx2].x && newGame.fallBrick[idx].y == newGame.landBrick[idx2].y-1) {
                    timeDelay = 500;
                    stopGame();
                    newGame.getDataLandBrick();
                    newGame.clearBrick();
                    newGame.makeRandomBrick();
                    console.log(`Số random: ${random}`);
                    newGame.noticeNextBrick();
                }
            }
        }
    }
    setTimeout(gameLoop,timeDelay);
}
gameLoop();

onkeydown = function(evt) {
    switch (evt.keyCode) {
        case 37:
            kiemTraVaCham();
            if (newGame.fallBrick[0].x != 0 && newGame.fallBrick[1].x != 0 && newGame.fallBrick[2].x != 0 && newGame.fallBrick[3].x != 0 && vaCham == false ) {
                newGame.moveLeftBrick();
            }
            break;
        case 38:
            if (newGame.fallBrick[0].y < newGame.row-5 || newGame.fallBrick[1].y < newGame.row-5 || newGame.fallBrick[2].y < newGame.row-5 || newGame.fallBrick[3].y < newGame.row-5) {
                newGame.rolateBrick();
            }
            break;
        case 39:
            kiemTraVaCham();
            if (newGame.fallBrick[0].x != newGame.col -1 && newGame.fallBrick[1].x != newGame.col -1 && newGame.fallBrick[2].x != newGame.col -1 && newGame.fallBrick[3].x != newGame.col -1 && vaCham ==false ) {
                newGame.moveRightBrick();
            }
            break;
        case 40:
            timeDelay = 20;
            break;
        default:
            break;
        }
}

