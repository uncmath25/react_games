import React from 'react';
import { Table } from 'react-bootstrap';

import SquareCell from './SquareCell';
import { BOARD_SIZE } from '../utils/board';

const CELL_PX_SIZE = 140;
const CELL_FONT_SIZE = 72;
const CELL_STYLE_PERC = 100 / BOARD_SIZE + '%';
const CELL_STYLE = {
    width: CELL_STYLE_PERC,
    height: CELL_STYLE_PERC,
    fontSize: CELL_FONT_SIZE + 'px'
};

export default function Board({ board }) {
    return (
        <Table bordered variant='dark'>
            <tbody>
                {Object.keys(board).map(
                    i => <tr key={i}>
                        {Object.keys(board[i]).map(
                            j => {
                                const val = board[i][j];
                                return <td key={j} style={CELL_STYLE}>
                                    <SquareCell text={val != 0 ? val : ''} pixelSize={CELL_PX_SIZE}/>
                                </td>
                            }
                        )}
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
