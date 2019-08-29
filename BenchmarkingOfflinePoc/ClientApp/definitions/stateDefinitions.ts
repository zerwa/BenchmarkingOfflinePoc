import { RouterState } from 'connected-react-router';

export interface State {
    users: User[] | null;
    channels: Channel[] | null;
    router: RouterState;
}

export interface User {
    userId: number;
    username: string;
    displayName: string | null;
    email: string | null;
    status: string | null;
    description: string | null;
}

export interface Channel {
    channelId: number;
    ownerId: number | null;
    displayName: string;
    isPublic: boolean;
    canAnyoneInvite: boolean;
    isGeneral: boolean;
    isActiveDirectMessage: boolean;
    owner?: User;
}
