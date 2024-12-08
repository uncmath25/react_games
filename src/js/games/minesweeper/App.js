import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

import Board from '../../components/DigitBoard';
import { init, initMask, BOARD_SIZE } from './utils/board';
import { getPaddingStyle } from '../../utils/style';

const GAME_STATE_PLAYING = 'Playing...';
const GAME_STATE_GAME_OVER = 'Game Over!';
const GAME_STATE_WON = 'Victory!';
const NEW_GAME_BUTTON_LABEL = 'Reset';

const COVERED_CELL_COLOR = 'black';
const REVEALED_CELL_COLOR = 'lightgrey';

export default function App() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [wonGame, setWonGame] = useState(false);
    const [board, setBoard] = useState(init());
    const [boardMask, setBoardMask] = useState(initMask());
    const resetGame = () => {
        setIsGameOver(false);
        setWonGame(false);
        setBoard(init());
        setBoardMask(initMask());
    };
    const formatBoard = (board) => {
        return board.map(row => row.map(val => val != 0 ? String(val) : ''));
    }
    const getCellStyles = (boardMask) => {
        return boardMask.map(row => row.map(val => {
            return {backgroundColor: val == 1 ? COVERED_CELL_COLOR : REVEALED_CELL_COLOR};
        }));
    };
    const onCellClick = (row, col) => {
        console.log(`Cell (${row}, ${col}) was clicked, with value: ${board[row][col]}`);
        const newBoardMask = [ ...boardMask ];
        newBoardMask[row][col] = 0;
        setBoardMask(newBoardMask);
    };
    const getGameState = () => {
        if (isGameOver) {
            return wonGame ? GAME_STATE_WON : GAME_STATE_GAME_OVER;
        }
        return GAME_STATE_PLAYING;
    };
    return (
        <Container>
            <Row>
                <Col xs={12} style={getPaddingStyle(20)}/>
            </Row>
            <Row>
                <Col xs={12} lg={8}>
                    <Board board={formatBoard(board)} boardSize={BOARD_SIZE}
                            cellStyles={getCellStyles(boardMask)} onCellClick={onCellClick}/>
                </Col>
                <Col xs={12} lg={4}>
                    <Table bordered striped>
                        <tbody>
                            <tr>
                                <td>
                                    <Button variant="primary" onClick={() => resetGame()}>
                                        {NEW_GAME_BUTTON_LABEL}
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {getGameState()}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
