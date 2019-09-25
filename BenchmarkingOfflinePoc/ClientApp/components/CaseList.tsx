import * as React from 'react';
import * as defs from '../definitions/definitions';
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import { Row, Col, Grid, Panel, ListGroup, ListGroupItem, Alert } from "react-bootstrap";
import { IAppState } from '../definitions/definitions';
import { connect } from 'react-redux';

interface urlParams {
    channelId: string;
}

interface IProps {
    cases: defs.Case[]
}

interface params extends RouteComponentProps<urlParams> {}

const mapStateToProps = (store: IAppState) => {
    return {
        cases: store.caseState.cases
    };
};

export type FullParams = params & IProps;

class CaseList extends React.Component<FullParams, {}> {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <Panel.Heading>
                                <Row>
                                    <Col xs={3}>Available Cases</Col>
                                    <Col xs={3}>Case Code</Col>
                                    <Col xs={3}>Function</Col>
                                </Row>
                            </Panel.Heading>
                            {
                                this.props.cases ?
                                    <ListGroup>
                                        {
                                            this.props.cases.map(c =>
                                                <ListGroupItem key={c.caseId}>
                                                    <Row>
                                                        <Col xs={3}>
                                                            {c.caseName}
                                                        </Col>
                                                        <Col xs={3}>
                                                            {c.caseCode}
                                                        </Col>
                                                        <Col xs={3}>
                                                            {c.function ? c.function.functionDisplayName : c.functionId}
                                                        </Col>
                                                        <Col xs={3}>
                                                            <Link to={`${this.props.match.url}/${c.caseId}/upload`}>
                                                                View Case Upload
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                        }
                                        </ListGroup> :
                                    <Panel.Body>Loading...</Panel.Body>
                            }
                        </Panel>
                    </Col>
                </Row>
                <Alert bsStyle="warning">Select a case to input data</Alert>
                <Row>
                    <Col xs={12}>
                        <Link to='/'>
                            Return to home
                        </Link>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect(mapStateToProps)(CaseList);
