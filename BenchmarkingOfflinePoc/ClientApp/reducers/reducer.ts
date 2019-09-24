import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router';
import { History } from "history";
import { caseReducer } from './CaseReducer';
import { IAppState } from '../definitions/definitions';
import { surveyReducer } from "./SurveyReducer";

// Create the root reducer
export const createRootReducer = (history: History) => combineReducers<IAppState>({
    caseState: caseReducer,
    surveyState: surveyReducer,
    router: connectRouter(history)
});