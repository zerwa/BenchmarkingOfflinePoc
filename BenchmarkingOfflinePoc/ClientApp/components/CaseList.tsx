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

interface localState {}

const mapStateToProps = (store: IAppState) => {
    return {
        cases: store.caseState.cases
    };
};

export type FullParams = params & IProps;

class CaseList extends React.Component<FullParams, localState> {
    constructor(p: FullParams) {
        super(p);

        this.state = {};

        this.reloadCases = this.reloadCases.bind(this);
    }

    componentDidMount() {
        this.reloadCases();
    }

    // Right now, we're front-loading the application. So all of the data we need will be loaded on page-load.
    // Realistically, this would probably need to change
    reloadCases() {
        //axios.get<defs.Case[]>("/api/cases").then((response) => {
        //    this.setState({
        //        cases: response.data
        //    });
        //}).catch(error => {
        //    console.log(error)
        //});
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <Panel.Heading>Available Cases</Panel.Heading>
                            {
                                this.props.cases ?
                                    <ListGroup>
                                        {
                                            this.props.cases.map(c =>
                                                <ListGroupItem key={c.caseId}>
                                                    <Row>
                                                        <Col xs={6}>
                                                            {c.caseName}
                                                        </Col>
                                                        <Col xs={6}>
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
                <Alert bsStyle="warning">Select a case to upload data</Alert>
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
