import { User } from '../../../models/user.model';
import { DeepReadonly } from 'utility-types';

export type UserLoginState = DeepReadonly<{
    loading: boolean;
    logged: boolean;
    user?: User;
    error?: string;
}>;

export const initialUserLoginState: UserLoginState = {loading: false, logged: false};

export type UserState = DeepReadonly<{
    login: UserLoginState;
    // register: UserRegisterState;
    // friends: UserFriendsState;
    // ...
}>;

export const initialUserState: UserState = {
    login: initialUserLoginState
    // register: initialUserRegisterState
    // friends: initialUserFriendsState
};
