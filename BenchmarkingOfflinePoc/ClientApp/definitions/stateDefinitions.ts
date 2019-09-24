import { RouterState } from 'connected-react-router';
import { ICaseState } from '../reducers/CaseReducer';
import { ISurveyState } from '../reducers/SurveyReducer';

// Create an interface for the application state
export interface IAppState {
    caseState: ICaseState;
    surveyState: ISurveyState
    router: RouterState;
}