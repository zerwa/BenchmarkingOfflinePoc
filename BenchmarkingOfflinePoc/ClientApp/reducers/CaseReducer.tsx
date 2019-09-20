// Import Reducer type
import { Reducer } from 'redux';
import * as defs from '../definitions/definitions';
import {
    CaseActionTypes,
    CaseActions
} from '../actions/CaseActions';

// Define the Character State
export interface ICaseState {
    readonly cases: defs.Case[];
}

// Define the initial state
const initialCaseState: ICaseState = {
    cases: []
};

export const caseReducer: Reducer<ICaseState, CaseActions> = (
    state = initialCaseState,
    action
) => {
    switch (action.type) {
        case CaseActionTypes.GET_ALL_CASES: {
            return {
                ...state,
                cases: action.cases,
            };
        }
        default:
            return state;
    }
};