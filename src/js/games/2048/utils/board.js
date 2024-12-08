import { getRandomInt, getRandomNumber } from './random';

export const BOARD_SIZE = 4;
export const WIN_VALUE = 128;

export const MOVE_LEFT = 'left';
export const MOVE_RIGHT = 'right';
export const MOVE_DOWN = 'down';
export const MOVE_UP = 'up';

export function init() {
    var board = [...Array(BOARD_SIZE).keys()].map(_ => buildZeroArr(BOARD_SIZE));
    addRandomNumber(board);
    addRandomNumber(board);
    return board;
}

function buildZeroArr(size) {
    return [...Array(size).keys()].map(_ => 0);
}

export function isGameWon(board) {
    var wonGame = false;
    board.forEach((row, i) => row.forEach((val, j) => {if (val >= WIN_VALUE) { wonGame = true }}));
    return wonGame;
}

export function isBoardFull(board) {
    const emptyIndices = findEmptyIndices(board);
    return emptyIndices.length == 0;
}

function findEmptyIndices(board) {
    var emptyIndices = [];
    board.forEach((row, i) => row.forEach((val, j) => {if (val == 0) { emptyIndices.push([i, j]) }}));
    return emptyIndices;
}

export function update(board, move) {
    board = adjust(board, move);
    board = slideLeft(board);
    board = merge(board);
    board = adjust(board, move);
    addRandomNumber(board);
    return board;
}

function adjust(board, move) {
    switch(move) {
        case MOVE_LEFT:
            return board;
        case MOVE_RIGHT:
            return reverse(board);
        case MOVE_DOWN:
            return reverse(transpose(reverse(board)));
        case MOVE_UP:
            return transpose(board);
    }
}

function reverse(board) {
    return board.map(row => row.reverse());
}

function transpose(board) {
    const newBoard = [];
    for (let i = 0; i < board.length; i++) {
        const newRow = [];
        for (let j = 0; j < board[i].length; j++) {
            newRow.push(board[j][i]);
        }
        newBoard.push(newRow);
    }
    return newBoard;
}

function slideLeft(board) {
    return board.map(row => {
        const nonZeroVals = row.filter(x => x != 0);
        return nonZeroVals.concat(buildZeroArr(BOARD_SIZE - nonZeroVals.length));
    });
}

function merge(board) {
    return board.map(row => {
        var mergedVals = [];
        var lastVal = row[0];
        if (lastVal == 0) { return row; }
        var i = 1;
        while (i < row.length) {
            var val = row[i];
            if (val == 0) {
                mergedVals.push(lastVal);
                break;
            }
            if (val == lastVal) {
                mergedVals.push(val + lastVal);
                lastVal = 0;
            } else {
                mergedVals.push(lastVal);
                lastVal = val;
            }
            i++;
        }
        if (i == row.length) {
            mergedVals.push(lastVal);
        }
        return mergedVals.concat(buildZeroArr(row.length - mergedVals.length));
    });
}

function addRandomNumber(board) {
    const emptyIndices = findEmptyIndices(board);
    const randomIndex = getRandomInt(emptyIndices.length - 1);
    const emptyIndex = emptyIndices[randomIndex];
    const randomNumber = getRandomNumber();
    board[emptyIndex[0]][emptyIndex[1]] = randomNumber;
}
