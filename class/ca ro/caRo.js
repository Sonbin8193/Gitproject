const ROW_COUNT = 20;
const COLUMN_COUNT = 20;
const CELL_SIZE = 40;
const CELL_VALUE_DEFAULT = '';
const CELL_VALUE_X = "X";
const CELL_VALUE_O = "O";

class Cell {
    constructor (rIndex, cIndex) {
        this.rowIndex = rIndex;
        this.colIndex = cIndex;
        this.value = CELL_VALUE_DEFAULT;
    }

    getCellHtml = function () {
        let leftDistance = this.colIndex * CELL_SIZE
        let topDistance = this.rowIndex * CELL_SIZE
        return `<div class="cell" id='cell_${this.rowIndex}_${this.colIndex}' style="left: ${leftDistance}px;top: ${topDistance}px">${this.value}</div>`;
    }
}

let banCo = document.getElementById('gameBoard');
for (let idxCol = 0; idxCol < ROW_COUNT; idxCol++) {
    for (let idx = 0; idx < COLUMN_COUNT; idx++) {
        let newCell = new Cell(idxCol,idx);
        banCo.innerHTML += newCell.getCellHtml();
    }
}