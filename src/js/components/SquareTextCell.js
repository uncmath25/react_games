import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function SquareCell({ text, pixelSize }) {
    const style = { width: pixelSize + 'px', height: pixelSize + 'px' }
    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center align-items-center" style={style}>
                    {text}
                </Col>
            </Row>
        </Container>
    );
}
