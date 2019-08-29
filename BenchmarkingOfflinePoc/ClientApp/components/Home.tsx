import * as React from "react";
import {Link} from "react-router-dom";
import {Row, Col, Grid, Panel} from "react-bootstrap";
import {Counter} from "./Counter";

export class Home extends React.Component<{}> {
    constructor(p: {}) {
        super(p);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6}>
                        <Panel>
                            <Panel.Heading>App Root</Panel.Heading>
                            <Panel.Body>
                                <Counter/>
                            </Panel.Body>
                            <Panel.Footer>
                                <Link to='/channels'>Go to channel list</Link>
                            </Panel.Footer>
                        </Panel>
                    </Col>
                    <Col xs={6}>
                        Content on right half of screen
                    </Col>
                </Row>
            </Grid>
        );
    }
}
