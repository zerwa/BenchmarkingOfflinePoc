
// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import * as defs from '../definitions/definitions';

// Import Character Typing
import { ICaseState } from '../reducers/CaseReducer';
import { OfflineAction } from '@redux-offline/redux-offline/lib/types';

// Create Action Constants
export enum CaseActionTypes {
    GET_ALL_CASES = 'GET_ALL_CASES'
}

// Interface for Get All Action Type
export interface ICaseGetAllAction {
    type: CaseActionTypes.GET_ALL_CASES;
    payload: defs.Case[];
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
            let cases: defs.Case[] = [];

            if (!navigator.onLine) {
                cases = JSON.parse(localStorage.getItem("cases") || "[]");
            }
            else {
                const response = await axios.get<defs.Case[]>('/api/cases');
                cases = response.data;
                localStorage.setItem("cases", JSON.stringify(cases));
            }

            dispatch({
                payload: cases,
                type: CaseActionTypes.GET_ALL_CASES,
            });
        } catch (err) {
            console.error(err);
        }
    };
};