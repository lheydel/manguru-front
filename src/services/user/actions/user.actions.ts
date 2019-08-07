import { User } from '../../../models/user.model';

export enum UserActionType {
    LOGIN_REQUEST = '@@user/LOGIN_REQUEST',
    LOGIN_JWT_REQUEST = '@@user/LOGIN_JWT_REQUEST',
    LOGIN_SUCCESS = '@@user/LOGIN_SUCCESS',
    LOGIN_FAILURE = '@@user/LOGIN_ERROR',

    REGISTER_REQUEST = '@@user/REGISTER_REQUEST',
    REGISTER_SUCCESS = '@@user/REGISTER_SUCCESS',
    REGISTER_FAILURE = '@@user/REGISTER_ERROR',
}

/* LOGIN */
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

/* REGISTER */
export interface UserRegisterActionRequest {
    type: UserActionType.REGISTER_REQUEST;
    email: string;
    username: string;
    password: string;
}

export interface UserRegisterActionSuccess {
    type: UserActionType.REGISTER_SUCCESS;
}

export interface UserRegisterActionFailure {
    type: UserActionType.REGISTER_FAILURE;
    error: string;
}

export type UserRegisterAction = UserRegisterActionRequest | UserRegisterActionSuccess | UserRegisterActionFailure;

