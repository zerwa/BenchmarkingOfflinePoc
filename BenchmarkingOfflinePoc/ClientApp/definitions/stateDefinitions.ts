import { RouterState } from 'connected-react-router';
import { ICaseState } from '../reducers/CaseReducer';
import { ITemplateState } from '../reducers/TemplateReducer';

// Create an interface for the application state
export interface IAppState {
    caseState: ICaseState;
    templateState: ITemplateState
    router: RouterState;
}