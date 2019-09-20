import * as defs from '../definitions/definitions';
import {RouterAction} from "connected-react-router";
import { CaseActions } from './CaseActions';
import { TemplateActions } from './TemplateActions';

export enum ActionTypes {
    ERROR_GENERATED = "ERROR_GENERATED"
}

export type AllActions = RouterAction | CaseActions | TemplateActions | errorGeneratedAction;

export interface errorGeneratedAction {
    type: ActionTypes.ERROR_GENERATED;
    error: string;
}

//export interface loadUsersAction {
//    type: ActionTypes.LOAD_USERS;
//    users: defs.User[];
//}
