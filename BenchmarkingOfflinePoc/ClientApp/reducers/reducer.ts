import * as defs from '../definitions/definitions';
import {ActionTypes, Action} from "../actions/actionTypes";
import {combineReducers, Reducer} from "redux";
import {connectRouter} from 'connected-react-router';
import {History} from "history";

export const initialUserState: defs.State['users'] = null;

export const userReducer: Reducer<defs.State['users'], Action> = (state = initialUserState, action) => {
    switch(action.type) {
        case ActionTypes.LOAD_USERS: {
            return action.users;
        }
    }
    return state;
};

export const initialCaseState: defs.State['cases'] = null;

export const caseReducer: Reducer<defs.State['cases']> = (state = initialCaseState, action) => {
    switch(action.type) {
        case ActionTypes.LOAD_CASES: {
            return action.cases;
        }
    }
    return state;
};

export const createRootReducer = (history: History) => combineReducers<defs.State>({
    users: userReducer,
    cases: caseReducer,
    router: connectRouter(history)
});
