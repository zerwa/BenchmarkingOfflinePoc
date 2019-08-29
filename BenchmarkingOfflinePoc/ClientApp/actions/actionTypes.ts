import * as defs from '../definitions/definitions';
import {RouterAction} from "connected-react-router";

export enum ActionTypes {
    LOAD_USERS = "LOAD_USERS",
    LOAD_CHANNELS = "LOAD_CHANNELS"
}

export type Action = RouterAction | loadUsersAction | loadChannelsAction;

export interface loadUsersAction {
    type: ActionTypes.LOAD_USERS;
    users: defs.User[];
}

export interface loadChannelsAction {
    type: ActionTypes.LOAD_CHANNELS;
    channels: defs.Channel[];
}
