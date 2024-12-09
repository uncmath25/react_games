import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

import Board from '../../components/DigitBoard';
import { getPaddingStyle } from '../../utils/style';
import { buildAdjacencies, buildMines, getCoveredSpaces, initMask, isGameWon, updateMask, BOARD_SIZE, NUM_MINES } from './utils/board';

const GAME_STATE_PLAYING = 'Playing...';
const GAME_STATE_GAME_OVER = 'Game Over!';
const GAME_STATE_WON = 'Victory!';
const NEW_GAME_BUTTON_LABEL = 'Reset';

const COVERED_CELL_COLOR = 'black';
const REVEALED_CELL_COLOR = 'lightgrey';
const MINE_CELL_COLOR = 'red';
const MINE_VICTORY_CELL_COLOR = 'blue';

export default function App() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [wonGame, setWonGame] = useState(false);
    const [mines, setMines] = useState([]);
    const [adjacencies, setAdjacencies] = useState([]);
    const [mask, setMask] = useState([]);
    useEffect(() => {
        reset();
    }, []);
    const reset = () => {
        const mines = buildMines();
        setIsGameOver(false);
        setWonGame(false);
        setMines(mines);
        setAdjacencies(buildAdjacencies(mines));
        setMask(initMask());
    };
    const formatBoard = () => {
        return adjacencies.map((row, i) => row.map((val, j) => mask[i][j] == 0 && val > 0 ? String(val) : ''));
    };
    const getCellStyles = () => {
        return mask.map((row, i) => row.map((val, j) => {
            let color = COVERED_CELL_COLOR;
            if (val == 0) {
                color = mines[i][j] ? MINE_CELL_COLOR : REVEALED_CELL_COLOR;
            }
            if (wonGame && mines[i][j]) {
                color = MINE_VICTORY_CELL_COLOR;
            }
            return {backgroundColor: color};
        }));
    };
    const onCellClick = (row, col) => {
        if (isGameOver) { return; }
        if (mask[row][col] == 0) { return; }
        console.log(`Cell (${row}, ${col}) was clicked, with adjacency: ${adjacencies[row][col]}`);
        setMask(updateMask([ ...mask ], mines, adjacencies, row, col));
        if (mines[row][col]) { 
            setIsGameOver(true);
            return;
        }
        if (isGameWon(mask)) {
            setIsGameOver(true);
            setWonGame(true);
        }
    };
    const getGameState = () => {
        if (isGameOver) {
            return wonGame ? GAME_STATE_WON : GAME_STATE_GAME_OVER;
        }
        return GAME_STATE_PLAYING;
    };
    const getRemainingSpaces = () => {
        return getCoveredSpaces(mask) - NUM_MINES;
    };
    return (
        <Container>
            <Row>
                <Col xs={12} style={getPaddingStyle(20)}/>
            </Row>
            <Row>
                <Col xs={12} lg={8}>
                    <Board board={formatBoard()} boardSize={BOARD_SIZE}
                            cellStyles={getCellStyles()} onCellClick={onCellClick}/>
                </Col>
                <Col xs={12} lg={4}>
                    <Table bordered striped>
                        <tbody>
                            <tr>
                                <td>
                                    <Button variant="primary" onClick={() => reset()}>
                                        {NEW_GAME_BUTTON_LABEL}
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {getGameState()}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Total Mines: {NUM_MINES}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Remaining Spaces To Uncover: {getRemainingSpaces()}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
