import { User } from '../../../models/user.model';
import { DeepReadonly } from 'utility-types';

// interface UserLoginRequest {
//     loading: true;
//     logged: false;
// }

// interface UserLoginSuccess {
//     loading: false;
//     logged: true;
//     user: User;
// }

// interface UserLoginFailure {
//     loading: false;
//     logged: false;
//     error: string;
// }

export type UserLoginState = DeepReadonly<{
    loading: boolean;
    logged: boolean;
    user?: User;
    error?: string;
}>;
// export type UserLoginState = DeepReadonly<UserLoginRequest | UserLoginSuccess | UserLoginFailure>;

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
