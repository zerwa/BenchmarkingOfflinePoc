// Import Reducer type
import { Reducer } from 'redux';
import * as defs from '../definitions/definitions';
import {
    SurveyActionTypes,
    SurveyActions
} from '../actions/SurveyActions';

// Define the Character State
export interface ISurveyState {
    readonly templates: defs.SurveyTemplate[];
    readonly metrics: defs.SurveyMetric[];
}

// Define the initial state
const initialSurveyState: ISurveyState = {
    templates: [],
    metrics: []
};

export const surveyReducer: Reducer<ISurveyState, SurveyActions> = (
    state = initialSurveyState,
    action
) => {
    console.log(state);
    switch (action.type) {
        case SurveyActionTypes.GET_ALL_TEMPLATES: {
            return {
                ...state,
                templates: action.payload
            };
        }
        case SurveyActionTypes.GET_ALL_METRICS: {
            return {
                ...state,
                metrics: action.payload
            };
        }
        case SurveyActionTypes.POST_METRIC: {
            // Remove the existing metric (if it existed bore)
            let existingMetrics = state.metrics.filter(m => m.surveyMetricId !== action.payload.surveyMetricId);

            return {
                ...state,
                // attach the new metric
                metrics: existingMetrics.concat(action.payload)
            }
        }
        default:
            return state;
    }
};