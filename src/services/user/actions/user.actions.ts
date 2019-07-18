import { User } from '../../../models/user.model';

export enum UserActionType {
    LOGIN_REQUEST = '@@user/LOGIN_REQUEST',
    LOGIN_JWT_REQUEST = '@@user/LOGIN_JWT_REQUEST',
    LOGIN_SUCCESS = '@@user/LOGIN_SUCCESS',
    LOGIN_FAILURE = '@@user/LOGIN_ERROR'
}

export interface UserLoginActionRequest {
    type: UserActionType.LOGIN_REQUEST;
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface UserLoginJwtActionRequest {
    type: UserActionType.LOGIN_JWT_REQUEST;
}

export interface UserLoginActionSuccess {
    type: UserActionType.LOGIN_SUCCESS;
    user: User;
}

export interface UserLoginActionFailure {
    type: UserActionType.LOGIN_FAILURE;
    error: string;
}

export type UserLoginAction = UserLoginActionRequest | UserLoginJwtActionRequest | UserLoginActionSuccess | UserLoginActionFailure;

