import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

import Board from './components/Board';
import { init, isBoardFull, isGameWon, update, MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from './utils/board';
import { getPaddingStyle } from '../../utils/style';

const GAME_STATE_PLAYING = 'Playing...';
const GAME_STATE_GAME_OVER = 'Game Over!';
const GAME_STATE_WON = 'Victory!';
const NEW_GAME_BUTTON_LABEL = 'New Game';

export default function App() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [wonGame, setWonGame] = useState(false);
    const [move, setMove] = useState("");
    const [board, setBoard] = useState(init());
    useEffect(() => {
        if (isGameOver) { return; }
        function handleKeyDown(e) {
            var move = "";
            switch(e.key) {
                case 'ArrowLeft':
                case 'a':
                    move = MOVE_LEFT;
                    break;
                case 'ArrowRight':
                case 'd':
                    move = MOVE_RIGHT;
                    break;
                case 'ArrowDown':
                case 's':
                    move = MOVE_DOWN;
                    break;
                case 'ArrowUp':
                case 'w':
                    move = MOVE_UP;
                    break;
            }
            setMove(move);
        }
        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isGameOver]);
    useEffect(() => {
        if (move == "") { return; }
        const newBoard = update(board, move);
        setBoard(newBoard);
        if (isGameWon(newBoard)) {
            setIsGameOver(true);
            setWonGame(true);
        } else {
            setIsGameOver(isBoardFull(newBoard));
        }
        setMove("");
    }, [move]);
    const resetGame = () => {
        setIsGameOver(false);
        setWonGame(false);
        setMove("");
        setBoard(init());
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
                    <Board board={board}/>
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
