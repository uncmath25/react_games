export const BOARD_SIZE = 12;

export function init() {
    var board = [...Array(BOARD_SIZE).keys()].map(_ => buildZeroArr(BOARD_SIZE));
    return board;
}

function buildZeroArr(size) {
    return [...Array(size).keys()].map(_ => 0);
}
