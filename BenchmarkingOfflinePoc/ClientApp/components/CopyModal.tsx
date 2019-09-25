import * as React from 'react';
import * as defs from '../definitions/definitions';
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Button, Panel, Glyphicon, Grid, Tabs, Tab, Modal, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { push } from "connected-react-router";
import { AllActions } from '../actions/actionTypes';
import { IAppState, getDefaultSurveyMetric } from '../definitions/definitions';
import { Question } from './Question';

interface params {
    caseCode: number;
    functionId: number;
    onCaseCopy: (selectedCase: defs.Case) => void;
}

interface connectedState {
    _cases: defs.Case[];
}

const mapStateToProps = (state: IAppState, ownProps: params): connectedState => {
    const caseMetrics: number[] = state.surveyState.metrics.map(m => m.caseId || 0);

    const caseOptions: defs.Case[] = state.caseState.cases
        .filter(c => c.caseCode == ownProps.caseCode && c.functionId !== ownProps.functionId && caseMetrics.indexOf(c.caseId) != -1);

    return {
        _cases: caseOptions
    };
};

type fullParams = params & connectedState;

interface localState {
    showModal: boolean;
    selectedCase: number;
}

class CopyModalComponent extends React.Component<fullParams, localState> {
    constructor(p: fullParams) {
        super(p);

        this.state = {
            showModal: false,
            selectedCase: 0
        }

        this.openModal = this.openModal.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.copyCase = this.copyCase.bind(this);
        this.onCopyChange = this.onCopyChange.bind(this);
    }

    openModal() {
        this.setState({
            showModal: true
        });
    }

    copyCase() {
        const toCopy: number = this.state.selectedCase;

        if (toCopy !== 0) {
            const selectedCase = this.props._cases.find(c => c.caseId == toCopy)
            this.props.onCaseCopy(selectedCase!);
        }

        this.setState({
            showModal: false,
            selectedCase: 0
        });
    }

    onModalClose() {
        this.setState({
            showModal: false
        });
    }

    onCopyChange(event: React.SyntheticEvent<{}>) {
        const target = event.target as HTMLOptionElement;
        const selectedCaseId = parseInt(target.value);

        this.setState({
            selectedCase: selectedCaseId
        });
    }

    render() {
        return (
            <>
                <Button
                    className="pull-right btn-block"
                    onClick={this.openModal}
                    disabled={this.props._cases.length == 0}
                >
                    <Glyphicon glyph="copy" /> Copy metrics from other case
                </Button>
                <Modal show={this.state.showModal} onHide={this.onModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Copy Metrics for Case: {this.props.caseCode}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>
                                The following Functions have the same case code:
                            </ControlLabel>
                            <FormControl componentClass="select" placeholder="select" value={this.state.selectedCase} onChange={this.onCopyChange}>
                                <option value={0} style={{ fontStyle: 'italic' }}>Select Function</option>
                                {
                                    this.props._cases.map(c => {
                                        return <option key={c.caseId} value={c.caseId}>
                                            {c.function ? c.function.functionDisplayName : c.functionId}
                                        </option>
                                    })
                                }
                            </FormControl>
                        </FormGroup>
                        <Row>
                            <Col xs={11} xsOffset={1}>
                                *Clicking "Copy" will replace any current metrics with the selected Function's
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.copyCase}>Copy</Button>
                        <Button onClick={this.onModalClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export const CopyModal: React.ComponentClass<params> =
    connect(mapStateToProps, {})(CopyModalComponent);
