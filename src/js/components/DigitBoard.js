import React from 'react';
import { Table } from 'react-bootstrap';

import SquareCell from './SquareTextCell';

const BOARD_SIZE_CELL_STYLES = {
    2: {cellPxSize: 280, cellFontSize: 140},
    4: {cellPxSize: 140, cellFontSize: 92},
    8: {cellPxSize: 60, cellFontSize: 52},
    12: {cellPxSize: 36, cellFontSize: 32},
    16: {cellPxSize: 24, cellFontSize: 24}
};

export default function Board({ board, boardSize }) {
    if (!Object.keys(BOARD_SIZE_CELL_STYLES).includes(String(boardSize))) {
        console.error(`boardSize ${boardSize} is invalid, must be one of: ${Object.keys(BOARD_SIZE_CELL_STYLES)}`);
        return (<div>Invalid Board Size</div>);
    }
    const { cellPxSize, cellFontSize } = BOARD_SIZE_CELL_STYLES[boardSize];
    return (
        <Table bordered variant='dark'>
            <tbody>
                {Object.keys(board).map(
                    i => <tr key={i}>
                        {Object.keys(board[i]).map(
                            j => {
                                const val = board[i][j];
                                return <td key={j} style={{fontSize: cellFontSize + 'px'}}>
                                    <SquareCell text={val} pixelSize={cellPxSize}/>
                                </td>
                            }
                        )}
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
