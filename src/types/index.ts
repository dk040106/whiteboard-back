import { RequestHandler } from 'express';

type EnumHttpMethod = 'get' | 'post' | 'put' | 'delete';
type EnumUserType = 'S' | 'P';

export interface IPermission {
    userTypes?: EnumUserType[];
    inLecture?: boolean;
}

export interface IRoute {
    method: EnumHttpMethod;
    path: string;
    handler: RequestHandler;
    permission?: IPermission;
}

export interface IAuth {
    userId: string,
    userType: EnumUserType
}

export class HttpError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}