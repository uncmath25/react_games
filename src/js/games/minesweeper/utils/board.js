import { buildConstArr } from '../../../utils/utils';

export const BOARD_SIZE = 12;

export function init() {
    var board = [...Array(BOARD_SIZE).keys()].map(_ => buildConstArr(BOARD_SIZE, 0));
    return board;
}

export function initMask() {
    return [...Array(BOARD_SIZE).keys()].map(_ => buildConstArr(BOARD_SIZE, 1));
}
