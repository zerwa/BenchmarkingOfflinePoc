import * as React from 'react';
import * as defs from '../definitions/definitions';
import { Row, Col, FormControl, Checkbox, Radio } from 'react-bootstrap';
import { getDefaultSurveyMetric } from '../definitions/definitions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface pickerParams {
    surveyMetric: defs.SurveyMetric
    onChange: (sm: defs.SurveyMetric) => void;
}

interface params extends pickerParams {
    question: defs.Question;
}

export default class Question extends React.Component<params, {}> {
    renderSwitch(param: defs.MetricType) {
        switch (param.metricTypeName.toLowerCase()) {
            case 'date':
                return <DateSelection onChange={this.props.onChange} surveyMetric={this.props.surveyMetric} />;
            case 'text':
                return <TextSetter onChange={this.props.onChange} surveyMetric={this.props.surveyMetric} />;
            case 'checkbox':
                return <CheckBox onChange={this.props.onChange} surveyMetric={this.props.surveyMetric} />;
            case 'number':
                return <NumberPicker onChange={this.props.onChange} surveyMetric={this.props.surveyMetric} />;
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

interface pickerState {
    optionalName?: string;
    surveyMetric: defs.SurveyMetric
}

class DateSelection extends React.Component<pickerParams, {}> {
    render() {
        return <DatePicker
            onChange={(m, e) => {
                this.props.onChange({
                    ...this.props.surveyMetric,
                    dateValue: m
                })
            }}
            className="form-control"
            selected={this.props.surveyMetric.dateValue}
            dateFormat={"DD-MM-YYYY"}
        />
    }
}

class TextSetter extends React.Component<pickerParams, {}> {
    constructor(p: pickerParams) {
        super(p);

        this.state = {
            surveyMetric: this.props.surveyMetric
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(event: React.SyntheticEvent<{}>) {
        
    }

    render() {
        return <FormControl
            type={"text"}
            placeholder={"Insert text"}
            value={this.props.surveyMetric.textValue || ""}
            onChange={e => {
                let target = e.target as HTMLInputElement;
                const changedSection = target.name;
                const newValue = target.value;

                this.props.onChange({
                    ...this.props.surveyMetric,
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
            value={this.props.surveyMetric.textValue || ""}
            onChange={e => {
                let target = e.target as HTMLInputElement;
                const changedSection = target.name;
                const newValue = target.value;

                this.props.onChange({
                    ...this.props.surveyMetric,
                    textValue: newValue
                })
            }} />
    }
}

class CheckBox extends React.Component<pickerParams, {}> {
    render() {
        return <>
            <Radio
                className="label-text"
                checked={this.props.surveyMetric.booleanValue || false}
                value={"yes"}
                onChange={e => {
                    this.props.onChange({
                        ...this.props.surveyMetric,
                        booleanValue: !this.props.surveyMetric.booleanValue
                    })
                }}
            >Yes</Radio>
            <Radio
                className="label-text"
                checked={!this.props.surveyMetric.booleanValue}
                value={"no"}
                onChange={e => {
                    this.props.onChange({
                        ...this.props.surveyMetric,
                        booleanValue: !this.props.surveyMetric.booleanValue
                    })
                }}
            >No</Radio>
        </>
    }
}