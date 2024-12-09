import { getRandomInt } from '../../../utils/random';
import { buildConstArr } from '../../../utils/utils';

export const NUM_MINES = 20;
export const BOARD_SIZE = 12;
export const MINE_ADJACENCY_VAL = -1;

export function buildMines() {
    const board = [...Array(BOARD_SIZE).keys()].map(_ => buildConstArr(BOARD_SIZE, 0));
    [...Array(NUM_MINES).keys()].forEach(_ => addRandomMine(board));
    return board;
}

function addRandomMine(board) {
    const emptyIndices = findEmptyIndices(board);
    const randomIndex = getRandomInt(emptyIndices.length - 1);
    const emptyIndex = emptyIndices[randomIndex];
    board[emptyIndex[0]][emptyIndex[1]] = 1;
}

function findEmptyIndices(board) {
    const emptyIndices = [];
    board.forEach((row, i) => row.forEach((val, j) => {if (val == 0) { emptyIndices.push([i, j]) }}));
    return emptyIndices;
}

export function buildAdjacencies(mines) {
    const board = [...Array(BOARD_SIZE).keys()].map(_ => buildConstArr(BOARD_SIZE, 0));
    board.forEach((row, i) => row.forEach((_, j) => {
        if (mines[i][j]) {
            board[i][j] = MINE_ADJACENCY_VAL;
        } else {
            const neighbors = [ ...getSideNeighbors(i, j), ...getDiagNeighbors(i, j) ]
            board[i][j] = neighbors.filter(rc => mines[rc[0]][rc[1]]).length;
        }
    }));
    return board;
}

function getSideNeighbors(row, col) {
    const neighbors = [];
    if (col > 0) { neighbors.push([row, col - 1]) }
    if (col < BOARD_SIZE - 1) { neighbors.push([row, col + 1]) }
    if (row > 0) { neighbors.push([row - 1, col]) }
    if (row < BOARD_SIZE - 1) { neighbors.push([row + 1, col]) }
    return neighbors
}

function getDiagNeighbors(row, col) {
    const neighbors = [];
    if (row > 0 && col > 0) { neighbors.push([row - 1, col - 1]) }
    if (row > 0 && col < BOARD_SIZE - 1) { neighbors.push([row - 1, col + 1]) }
    if (row < BOARD_SIZE - 1 && col > 0) { neighbors.push([row + 1, col - 1]) }
    if (row < BOARD_SIZE - 1 && col < BOARD_SIZE - 1) { neighbors.push([row + 1, col + 1]) }
    return neighbors
}

export function initMask() {
    return [...Array(BOARD_SIZE).keys()].map(_ => buildConstArr(BOARD_SIZE, 1));
}

export function updateMask(mask, mines, adjacencies, row, col) {
    getRevealedNeighbors(mines, adjacencies, Number(row), Number(col)).forEach(rc => { mask[rc[0]][rc[1]] = 0; });
    return mask;
}

function getRevealedNeighbors(mines, adjacencies, row, col) {
    const neighbors = [];
    neighbors.push([row, col]);
    if (mines[row][col]) { return neighbors; }
    const neighborsToAdd = getSideNeighbors(row, col).filter(rc => mines[rc[0]][rc[1]] == 0);
    while (neighborsToAdd.length > 0) {
        const neighbor = neighborsToAdd.shift();
        if (mines[neighbor[0]][neighbor[1]]) { continue; }
        neighbors.push(neighbor);
        if (adjacencies[neighbor[0]][neighbor[1]] > 0) { continue; }
        getSideNeighbors(neighbor[0], neighbor[1]).forEach(n => {
            if (!containsSubarray(neighbors, n) && !containsSubarray(neighborsToAdd, n)) { neighborsToAdd.push(n); }
        });
    }
    // console.log(row);
    // console.log(col);
    // console.log(neighbors);
    // console.log(neighborsToAdd);
    return neighbors
}

function containsSubarray (arrOfArrs, arr) {
    return arrOfArrs.some(a => a.length === arr.length && a.every((val, i) => val === arr[i]));
}

export function isGameWon(mask) {
    return NUM_MINES == mask.reduce((row_acc, row) => row_acc + row.reduce((col_acc, col) => col_acc + col, 0), 0);
}
