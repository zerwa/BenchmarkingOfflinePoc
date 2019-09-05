import * as defs from '../definitions/definitions';
import {RouterAction} from "connected-react-router";

export enum ActionTypes {
    LOAD_USERS = "LOAD_USERS",
    LOAD_CASES = "LOAD_CASES"
}

export type Action = RouterAction | loadUsersAction | loadCasesAction;

export interface loadUsersAction {
    type: ActionTypes.LOAD_USERS;
    users: defs.User[];
}

export interface loadCasesAction {
    type: ActionTypes.LOAD_CASES;
    channels: defs.Case[];
}
