import { User } from '../../../models/user.model';
import { DeepReadonly } from 'utility-types';

/* LOGIN */
export type UserLoginState = DeepReadonly<{
    loading: boolean;
    logged: boolean;
    user?: User;
    error?: string;
}>;

export const initialUserLoginState: UserLoginState = { loading: false, logged: false };

/* REGISTER */
export type UserRegisterState = DeepReadonly<{
    loading: boolean;
    registered: boolean;
    error?: string;
}>;

export const initialUserRegisterState: UserRegisterState = { loading: false, registered: false };

/* OVERALL */
export type UserState = DeepReadonly<{
    login: UserLoginState;
    register: UserRegisterState;
}>;

export const initialUserState: UserState = {
    login: initialUserLoginState,
    register: initialUserRegisterState,
};
