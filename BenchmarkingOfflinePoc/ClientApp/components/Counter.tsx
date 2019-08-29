import * as React from "react";
import {Row, Col, Button} from "react-bootstrap";

import '../styles/Counter.css';

interface params {}

interface localState {
    count: number;
}

export class Counter extends React.Component<params, localState> {
    constructor(p: params) {
        super(p);

        this.state = {
            count: 0
        }
    }

    render() {
        return (
            <Row>
                <Col xs={6}>
                    <div className={'my-counter'}>Counter: {this.state.count}</div>
                </Col>
                <Col xs={6}>
                    <Button
                        onClick={e => this.setState({count: this.state.count+1})}
                    >
                        Increment
                    </Button>
                </Col>
            </Row>
        );
    }
}
