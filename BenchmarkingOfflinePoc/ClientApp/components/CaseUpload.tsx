import * as React from 'react';
import * as defs from '../definitions/definitions';
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Row, Col, Button, Panel, Glyphicon, Grid, Tabs, Tab} from "react-bootstrap";
import {push} from "connected-react-router";
import { AllActions } from '../actions/actionTypes';
import { IAppState, getDefaultSurveyMetric } from '../definitions/definitions';
import Question from './Question';

interface urlParams {
    caseId: string;
}

interface params extends RouteComponentProps<urlParams> {}

interface connectedState {
    _case: defs.Case | null;
    _template: defs.SurveyTemplate | null;
}

interface connectedDispatch {
    //go to a local url
    push: (url: string) => void;
}

const mapStateToProps = (state: IAppState, ownProps: params): connectedState => {
    //select the specific channel from redux matching the channelId route parameter
    let _case: defs.Case | null | undefined = null;
    let _template: defs.SurveyTemplate | null | undefined = null;

    if(state.caseState.cases) {
        const caseId = parseInt(ownProps.match.params.caseId);
        _case = state.caseState.cases.find(c => c.caseId === caseId);
    }
    if (_case && state.templateState.templates) {
        _template = state.templateState.templates.find(t => t.functionId === _case!.functionId);
    }

    return {
        _case: _case || null,
        _template: _template || null
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AllActions>): connectedDispatch => ({
    push: url => dispatch(push(url))
});

type fullParams = params & connectedState & connectedDispatch;

interface localState {
    activeKey: number;
}

class CaseUploadComponent extends React.Component<fullParams, localState> {
    constructor(p: fullParams) {
        super(p);

        this.state = {
            activeKey: 0
        }

        this.changeTab = this.changeTab.bind(this);
        this.onQuestionChange = this.onQuestionChange.bind(this);
    }

    changeTab(eventKey: any) {
        this.setState({
            activeKey: eventKey
        })
    }

    onQuestionChange(newSurveyMetric: defs.SurveyMetric) {
        console.log(newSurveyMetric);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        {
                            this.props._case && this.props._template ?
                                <Panel>
                                    <Panel.Heading>
                                        Case: {this.props._case.caseName}
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <Tabs
                                            activeKey={this.state.activeKey}
                                            onSelect={this.changeTab}
                                            id="tab-uploader">
                                            {
                                                this.props._template.tab ?
                                                    this.props._template.tab
                                                        .sort((a: defs.Tab, b: defs.Tab) => a.tabOrder - b.tabOrder)
                                                        .map((tab: defs.Tab, index: number) => {
                                                            return <Tab key={tab.tabOrder} eventKey={index} title={tab.tabName}>
                                                                {
                                                                    tab.question ?
                                                                        tab.question
                                                                            .sort((a, b) => a.questionOrder - b.questionOrder)
                                                                            .map(question => <Question
                                                                                question={question}
                                                                                key={question.questionId}
                                                                                onChange={this.onQuestionChange}
                                                                                surveyMetric={{
                                                                                    ...getDefaultSurveyMetric(),
                                                                                    surveyMetricMetadataId: question.surveyMetricMetadataId || 0
                                                                                }}

                                                                            />) :
                                                                        null
                                                                }
                                                            </Tab>
                                                        })
                                                        :
                                                    <Tab>Loading</Tab>
                                            }
                                        </Tabs>
                                        
                                        <Link to='/cases'>
                                            Close using a link
                                        </Link>
                                    </Panel.Body>
                                    <Panel.Footer>
                                        <Button
                                            onClick={e => {
                                                this.props.push('/cases');
                                            }}
                                        >
                                            <Glyphicon glyph="remove" /> Close
                                </Button>
                                    </Panel.Footer>
                                </Panel>
                                :
                                <div>Loading...</div>
                        }
                        
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export const CaseUpload: React.ComponentClass<params> =
    connect(mapStateToProps, mapDispatchToProps)(CaseUploadComponent);
