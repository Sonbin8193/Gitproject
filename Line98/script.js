let ctx = document.getElementById('myCanvas').getContext('2d');
let img = document.getElementById('backGround');
const ROW_VALUE = 9;
const COL_VALUE = 9;
const CELL_SIZE = 20;
ctx.drawImage(img,0,0);

class RandomBall {
    constructor(color, boolean) {
        this.color = color;
        this.boolean = boolean;
    }

    makeColorBall() {
        let numberColor = Math.floor(Math.random()*7)+1;
        switch (numberColor) {
            case 1:
            color = 'red';
            case 2:
            color = 'blue';
            case 3:
            color = 'yellow';
            case 4:
            color = 'pink';
            case 5:
            color = 'green';
            case 6:
            color = 'aqua';
            break;
        }
        return color;
    }

    appearColor() {
        if (this.boolean) {
            this.makeColorBall();
        } else {
            this.color = 0;
        }
    }
}

class BoardGameLine {
    constructor (rowIndex, colIndex, color) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.color = color;
    }

    getCellHtml = function () {
        let leftDistance = 10 +this.colIndex * CELL_SIZE
        let topDistance = 70+ this.rowIndex * CELL_SIZE
        return `<div class="cell" onclick=clickBox(cell_${this.rowIndex}_${this.colIndex}) id='cell_${this.rowIndex}_${this.colIndex}' style="left: ${leftDistance}px;top: ${topDistance}px">${this.value}</div>`;
    }
}

function drawBoard() {
    let data = '';
    for (let i = 0; i < ROW_VALUE; i++) {
        let boardRow = [];
        for (let j = 0; j < COL_VALUE; j++) {
            boardRow.push(0);  
        }
    }
}