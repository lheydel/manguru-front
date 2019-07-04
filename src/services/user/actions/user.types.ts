import { User } from '../../../models/user.model';

export enum UserActionType {
  LOGIN_REQUEST = '@@user/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@user/LOGIN_SUCCESS',
  LOGIN_ERROR = '@@user/LOGIN_ERROR'
}

export interface UserLoginActionRequest {
  type: UserActionType.LOGIN_REQUEST;
  email: string;
  password: string;
}

export interface UserLoginActionSuccess {
  type: UserActionType.LOGIN_SUCCESS;
  user: User;
}

export interface UserLoginActionError {
  type: UserActionType.LOGIN_ERROR;
  error: string;
}

export type UserLoginAction = UserLoginActionRequest | UserLoginActionSuccess | UserLoginActionError;

