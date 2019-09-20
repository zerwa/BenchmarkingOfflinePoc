// Import Reducer type
import { Reducer } from 'redux';
import * as defs from '../definitions/definitions';
import {
    TemplateActions,
    TemplateActionTypes
} from '../actions/TemplateActions';

// Define the Character State
export interface ITemplateState {
    readonly templates: defs.SurveyTemplate[];
}

// Define the initial state
const initialTemplateState: ITemplateState = {
    templates: [],
};

export const templateReducer: Reducer<ITemplateState, TemplateActions> = (
    state = initialTemplateState,
    action
) => {
    switch (action.type) {
        case TemplateActionTypes.GET_ALL_TEMPLATES: {
            return {
                ...state,
                templates: action.templates,
            };
        }
        default:
            return state;
    }
};