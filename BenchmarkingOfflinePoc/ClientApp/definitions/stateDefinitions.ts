import { RouterState } from 'connected-react-router';
import { ICaseState } from '../reducers/CaseReducer';

// Create an interface for the application state
export interface IAppState {
    caseState: ICaseState;
    router: RouterState;
}

//export interface User {
//    userId: number;
//    username: string;
//    displayName: string | null;
//    email: string | null;
//    status: string | null;
//    description: string | null;
//}

export interface Case {
    caseId: number;
    caseName: string;
    caseCode: number;
}

//export type thunk<T> = (dispatch: Dispatch<State>, getState: () => State) => T;
//export type asyncThunk<T> = thunk<Promise<T>>;