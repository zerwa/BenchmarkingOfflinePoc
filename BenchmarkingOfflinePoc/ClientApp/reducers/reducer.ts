import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router';
import { History } from "history";
import { caseReducer } from './CaseReducer';
import { IAppState } from '../definitions/definitions';
import { templateReducer } from "./TemplateReducer";

//export const initialUserState: defs.State['users'] = null;

//export const userReducer: Reducer<defs.State['users'], Action> = (state = initialUserState, action) => {
//    switch(action.type) {
//        case ActionTypes.LOAD_USERS: {
//            return action.users;
//        } 
//    }
//    return state;
//};

//export const initialCaseState: defs.State['cases'] = null;

//export const caseReducer: Reducer<defs.State['cases']> = (state = initialCaseState, action) => {
//    switch(action.type) {
//        case ActionTypes.LOAD_CASES: {
//            return action.cases;
//        }
//    }
//    return state;
//};

// Create the root reducer
export const createRootReducer = (history: History) => combineReducers<IAppState>({
    caseState: caseReducer,
    templateState: templateReducer,
    router: connectRouter(history)
});