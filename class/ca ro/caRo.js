const ROW_COUNT = 20;
const COLUMN_COUNT = 20;
const CELL_SIZE = 40;
const CELL_VALUE_DEFAULT = 'A';
const CELL_VALUE_X = "X";
const CELL_VALUE_O = "O";

class Cell {
    constructor (rIndex, cIndex) {
        this.rowIndex = rIndex;
        this.colIndex = cIndex;
        this.value = CELL_VALUE_DEFAULT;
    }

    getCellHtml = function () {
        let leftDistance = 10 +this.colIndex * CELL_SIZE
        let topDistance = 70+ this.rowIndex * CELL_SIZE
        return `<div class="cell" onclick=clickBox(cell_${this.rowIndex}_${this.colIndex}) id='cell_${this.rowIndex}_${this.colIndex}' style="left: ${leftDistance}px;top: ${topDistance}px">${this.value}</div>`;
    }
}

    let banCo = document.getElementById('gameBoard');
    for (let idxCol = 0; idxCol < ROW_COUNT; idxCol++) {
        for (let idx = 0; idx < COLUMN_COUNT; idx++) {
            let newCell = new Cell(idxCol,idx);
            banCo.innerHTML += newCell.getCellHtml();
        }
    }

// function clickBox(value) {
//     let giaTriBox = document.getElementById(`cell_${Cell.rowIndex}_${Cell.colIndex}`).value;
//     giaTriBox = giaTriBox == CELL_VALUE_DEFAULT ? CELL_VALUE_X : CELL_VALUE_O;
// }