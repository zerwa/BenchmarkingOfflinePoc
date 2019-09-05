import { RouterState } from 'connected-react-router';

export interface State {
    users: User[] | null;
    cases: Case[] | null;
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

export interface Case {
    caseId: number;
    caseName: string;
    caseCode: number;
}
