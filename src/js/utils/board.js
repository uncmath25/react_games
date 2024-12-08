import { getRandomInt } from './util';

export const BOARD_SIZE = 4;
export const WIN_VALUE = 32;
export const RANDOM_THRESHOLD = 0.7;
export const RANDOM_VALUE_1 = 2;
export const RANDOM_VALUE_2 = 4;

export const MOVE_LEFT = 'left';
export const MOVE_RIGHT = 'right';
export const MOVE_DOWN = 'down';
export const MOVE_UP = 'up';

export function init() {
    var board = [...Array(BOARD_SIZE).keys()].map(i => [...Array(BOARD_SIZE).keys()].map(j => 0));
    addRandomNumber(board);
    addRandomNumber(board);
    return board;
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
    var emptyIndices = []
    board.forEach((row, i) => row.forEach((val, j) => {if (val == 0) { emptyIndices.push([i, j]) }}))
    return emptyIndices;
}

export function update(board, move) {
    addRandomNumber(board);
    return board;
}

function addRandomNumber(board) {
    const emptyIndices = findEmptyIndices(board);
    const randomIndex = getRandomInt(emptyIndices.length - 1);
    const emptyIndex = emptyIndices[randomIndex];
    const randomNumber = Math.random() > RANDOM_THRESHOLD ? RANDOM_VALUE_2 : RANDOM_VALUE_1
    board[emptyIndex[0]][emptyIndex[1]] = randomNumber
}
