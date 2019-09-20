
// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import * as defs from '../definitions/definitions';

// Import Character Typing
import { ITemplateState } from '../reducers/TemplateReducer';

// Create Action Constants
export enum TemplateActionTypes {
    GET_ALL_TEMPLATES = 'GET_ALL_TEMPLATES'
}

// Interface for Get All Action Type
export interface ITemplateGetAllAction {
    type: TemplateActionTypes.GET_ALL_TEMPLATES;
    templates: defs.SurveyTemplate[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type TemplateActions = ITemplateGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllSurveyTemplates: ActionCreator<
    ThunkAction<Promise<any>, ITemplateState, null, ITemplateGetAllAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get<defs.SurveyTemplate[]>('/api/survey-templates');
            dispatch({
                templates: response.data,
                type: TemplateActionTypes.GET_ALL_TEMPLATES,
            });
        } catch (err) {
            console.error(err);
        }
    };
};