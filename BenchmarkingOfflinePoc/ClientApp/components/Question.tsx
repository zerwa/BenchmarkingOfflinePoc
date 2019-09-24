import * as React from 'react';
import * as defs from '../definitions/definitions';
import { Row, Col, FormControl, Checkbox, Radio } from 'react-bootstrap';
import { getDefaultSurveyMetric, IAppState, SurveyMetric } from '../definitions/definitions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { postSurveyMetricActionCreator, ISurveyMetricPostAction } from '../actions/SurveyActions';
import { AllActions } from '../actions/actionTypes';
import { ThunkDispatch } from 'redux-thunk';

export interface Question {
    save: () => void;
    checkClear: () => boolean;
}

interface params {
    caseId: number;
    question: defs.Question;
    onRef?: (component: Question) => void;
}

interface connectedState {
    _surveyMetric: defs.SurveyMetric;
}

const mapStateToProps = (state: IAppState, ownProps: params): connectedState => {
    let _metric: defs.SurveyMetric = {
        ...getDefaultSurveyMetric(),
        surveyMetricMetadataId: ownProps.question.surveyMetricMetadataId || 0,
        caseId: ownProps.caseId
    };

    //select the specific channel from redux matching the channelId route parameter
    if (state.surveyState && state.surveyState.metrics) {
        const metric = state.surveyState.metrics
            .find(m => m.caseId == ownProps.caseId && m.surveyMetricMetadataId == ownProps.question.surveyMetricMetadataId);

        if (metric) {
            console.log("new metric");
            console.log(metric);
            _metric = { ...metric };
        }
    }

    return {
        _surveyMetric: _metric
    };
};

interface connectedDispatch {
    postSurveyMetric: (surveyMetric: defs.SurveyMetric) => Promise<ISurveyMetricPostAction>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): connectedDispatch => ({
    postSurveyMetric: (surveyMetric: defs.SurveyMetric) => dispatch(postSurveyMetricActionCreator(surveyMetric))
});

interface localState {
    localMetric: defs.SurveyMetric;
}

const SURVEY_CHECKING_PARAMS: (keyof SurveyMetric)[] = [
    "booleanValue",
    "dateValue",
    "numberValue",
    "textValue",
];

type fullParams = params & connectedState & connectedDispatch;

class QuestionComponent extends React.Component<fullParams, localState> implements Question {
    constructor(p: fullParams) {
        super(p);

        this.state = {
            localMetric: { ...this.props._surveyMetric }
        }

        this.renderSwitch = this.renderSwitch.bind(this);
        this.metricChange = this.metricChange.bind(this);
        this.save = this.save.bind(this);
        this.paramComparison = this.paramComparison.bind(this);

        if (p.onRef) {
            p.onRef(this);
        }
    }

    static getDerivedStateFromProps(nextProps: fullParams, prevState: localState) {
        if (nextProps._surveyMetric.surveyMetricId !== prevState.localMetric.surveyMetricId) {
            // do things with nextProps.someProp and prevState.cachedSomeProp
            return {
                localMetric: {
                    ...prevState.localMetric,
                    surveyMetricId: nextProps._surveyMetric.surveyMetricId
                }
                // ... other derived state properties
            };
        }
        else {
            return null;
        }
    }

    save() {
        SURVEY_CHECKING_PARAMS.forEach(q => {
            if (this.paramComparison(q)) {
                this.props.postSurveyMetric(this.state.localMetric);
            }
        });
    }

    paramComparison(param: keyof SurveyMetric): boolean {
        if (this.state.localMetric[param] !== this.props._surveyMetric[param]) {
            return true;
        }
        return false;
    }

    checkClear() {
        let unsaved: boolean = false;

        SURVEY_CHECKING_PARAMS.forEach(q => {
            unsaved = this.paramComparison(q)
        });

        return unsaved;
    }

    metricChange(surveyMetric: defs.SurveyMetric) {
        console.log("change");
        this.setState({
            localMetric: { ...surveyMetric }
        });
    }

    renderSwitch(param: defs.MetricType) {
        switch (param.metricTypeName.toLowerCase()) {
            case 'date':
                return <DateSelection onChange={this.metricChange} localMetric={this.state.localMetric} />;
            case 'text':
                return <TextSetter onChange={this.metricChange} localMetric={this.state.localMetric} />;
            case 'checkbox':
                return <CheckBox onChange={this.metricChange} localMetric={this.state.localMetric} />;
            case 'number':
                return <NumberPicker onChange={this.metricChange} localMetric={this.state.localMetric} />;
            default:
                return null;
        }
    }

    render() {
        return <Row>
            <Col xs={12}>
                <div>
                    {this.props.question.questionMainText}
                </div>
                {
                    this.props.question.surveyMetricMetadata &&
                    this.props.question.surveyMetricMetadata.metricType ?
                    this.renderSwitch(this.props.question.surveyMetricMetadata.metricType) : null
                }
            </Col>
        </Row>
    }
}

export const Question: React.ComponentClass<params> =
    connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);

interface pickerParams {
    localMetric: defs.SurveyMetric;
    onChange: (sm: defs.SurveyMetric) => void;
}

interface pickerState {
    optionalName?: string;
    surveyMetric: defs.SurveyMetric
}

class DateSelection extends React.Component<pickerParams, {}> {
    render() {
        const date: Date | null = this.props.localMetric.dateValue ? new Date(this.props.localMetric.dateValue) : null;

        return <DatePicker
            onChange={(m, e) => {
                this.props.onChange({
                    ...this.props.localMetric,
                    dateValue: m
                })
            }}
            className="form-control"
            selected={date}
            dateFormat={"MM-dd-yyyy"}
        />
    }
}

class TextSetter extends React.Component<pickerParams, {}> {
    render() {
        return <FormControl
            type={"text"}
            placeholder={"Insert text"}
            value={this.props.localMetric.textValue || ""}
            onChange={e => {
                let target = e.target as HTMLInputElement;
                const changedSection = target.name;
                const newValue = target.value;

                this.props.onChange({
                    ...this.props.localMetric,
                    textValue: newValue
                })
            }} />
    }
}

class NumberPicker extends React.Component<pickerParams, {}> {
    render() {
        return <FormControl
            placeholder={"Insert Number"}
            type="number"
            value={this.props.localMetric.numberValue || ""}
            onChange={e => {
                let target = e.target as HTMLInputElement;
                const newValue = target.value;

                this.props.onChange({
                    ...this.props.localMetric,
                    numberValue: parseInt(newValue)
                })
            }} />
    }
}

class CheckBox extends React.Component<pickerParams, {}> {
    render() {
        return <>
            <Radio
                className="label-text"
                checked={this.props.localMetric.booleanValue || false}
                value={"yes"}
                onChange={e => {
                    this.props.onChange({
                        ...this.props.localMetric,
                        booleanValue: !this.props.localMetric.booleanValue
                    })
                }}
            >
                Yes
            </Radio>
            <Radio
                className="label-text"
                checked={!this.props.localMetric.booleanValue}
                value={"no"}
                onChange={e => {
                    this.props.onChange({
                        ...this.props.localMetric,
                        booleanValue: !this.props.localMetric.booleanValue
                    })
                }}
            >
                No
            </Radio>
        </>
    }
}