import * as React from "react";
import {Link} from "react-router-dom";
import {Row, Col, Grid, Panel, Button} from "react-bootstrap";

export class Home extends React.Component<{}> {
    constructor(p: {}) {
        super(p);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <Panel.Heading>App Root</Panel.Heading>
                            <Panel.Body>
                                This POC is meant to test offline capabilities with regard to data upload.
                                <Row>
                                    <Col xs={6}>
                                        <Button>
                                            Clear Case Data
                                        </Button>
                                    </Col>
                                    <Col xs={6}>
                                        <span>To clear all data in the POC, click the button</span>
                                    </Col>
                                </Row>
                            </Panel.Body>
                            <Panel.Footer>
                                <Link to='/cases'>Go to case list</Link>
                            </Panel.Footer>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
