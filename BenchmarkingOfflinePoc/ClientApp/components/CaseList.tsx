import * as React from 'react';
import * as defs from '../definitions/definitions';
import {Route, RouteComponentProps, Switch} from "react-router";
import {Dispatch} from "redux";
import {Action, ActionTypes} from "../actions/actionTypes";
import {connect} from "react-redux";
import {ViewChannel} from "./ViewChannel";
import {Link} from "react-router-dom";
import { Row, Col, Grid, Panel, ListGroup, ListGroupItem, Alert } from "react-bootstrap";
import axios, { AxiosResponse } from 'axios';

interface urlParams {
    channelId: string;
}

interface params extends RouteComponentProps<urlParams> {}

interface localState {
    cases: defs.Case[];
}

export class ChannelList extends React.Component<params, localState> {
    constructor(p: params) {
        super(p);

        this.state = {
            cases: []
        };

        this.reloadCases = this.reloadCases.bind(this);
    }

    componentDidMount() {
        this.reloadCases();
    }

    reloadCases() {
        if (!navigator.onLine) {
            this.setState({
                cases: JSON.parse(localStorage.getItem("cases") || "[]")
            });
        }
        else {
            axios.get<defs.Case[]>("/api/cases").then((response) => {
                localStorage.setItem("cases", JSON.stringify(response.data));
                this.setState({
                    cases: response.data
                });
            }).catch(error => {
                console.log(error)
            });
        } 
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <Panel.Heading>Available Channels</Panel.Heading>
                            {
                                this.state.cases ?
                                    <ListGroup>
                                        {
                                            this.state.cases.map(c =>
                                                <ListGroupItem key={c.caseId}>
                                                    <Row>
                                                        <Col xs={6}>
                                                            {c.caseName}
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Link to={`${this.props.match.url}/${c.caseId}/view`}>
                                                                View Case
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
                <Switch>
                    <Route path={`${this.props.match.url}/:channelId/view`} component={ViewChannel}/>
                    <Route
                        render={() =>
                            <Alert bsStyle="warning">Select a case to upload data</Alert>
                        }
                    />
                </Switch>
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
