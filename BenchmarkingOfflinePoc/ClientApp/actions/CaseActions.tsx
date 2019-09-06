
// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import * as defs from '../definitions/definitions';

// Import Character Typing
import { ICaseState } from '../reducers/CaseReducer';

// Create Action Constants
export enum CaseActionTypes {
    GET_ALL = 'GET_ALL',
}

// Interface for Get All Action Type
export interface ICaseGetAllAction {
    type: CaseActionTypes.GET_ALL;
    cases: defs.Case[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type CaseActions = ICaseGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllCases: ActionCreator<
    ThunkAction<Promise<any>, ICaseState, null, ICaseGetAllAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get<defs.Case[]>('/api/cases');
            dispatch({
                cases: response.data,
                type: CaseActionTypes.GET_ALL,
            });
        } catch (err) {
            console.error(err);
        }
    };
};