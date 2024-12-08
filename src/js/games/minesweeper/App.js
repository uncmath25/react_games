import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

import Board from '../../components/DigitBoard';
import { init, BOARD_SIZE } from './utils/board';
import { getPaddingStyle } from '../../utils/style';

const GAME_STATE_PLAYING = 'Playing...';
const GAME_STATE_GAME_OVER = 'Game Over!';
const GAME_STATE_WON = 'Victory!';
const NEW_GAME_BUTTON_LABEL = 'Reset';

export default function App() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [wonGame, setWonGame] = useState(false);
    const [board, setBoard] = useState(init());
    const resetGame = () => {
        setIsGameOver(false);
        setWonGame(false);
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
                    <Board board={board} boardSize={BOARD_SIZE}/>
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
