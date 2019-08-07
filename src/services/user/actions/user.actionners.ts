import { User } from '../../../models/user.model';
import {
    UserActionType,
    UserLoginActionFailure, UserLoginActionRequest, UserLoginActionSuccess, UserLoginJwtActionRequest,
    UserRegisterActionRequest, UserRegisterActionSuccess, UserRegisterActionFailure
} from './user.actions';

/**
 * Define actions on users
 * Possible actions:
 *  - login
 *  - logout
 *  - register
 *  - remove
 */
class UserActions {

    /* LOGIN */
    public loginRequest(email: string, password: string, rememberMe: boolean): UserLoginActionRequest {
        return {
            type: UserActionType.LOGIN_REQUEST,
            email: email,
            password: password,
            rememberMe: rememberMe,
        };
    }

    public loginJwtRequest(): UserLoginJwtActionRequest {
        return {
            type: UserActionType.LOGIN_JWT_REQUEST,
        };
    }

    public loginSuccess(users: User): UserLoginActionSuccess {
        return {
            type: UserActionType.LOGIN_SUCCESS,
            user: users
        };
    }

    public loginFailure(error: string): UserLoginActionFailure {
        return {
            type: UserActionType.LOGIN_FAILURE,
            error: error
        };
    }

    /* REGISTER */
    public registerRequest(email: string, username: string, password: string): UserRegisterActionRequest {
        return {
            type: UserActionType.REGISTER_REQUEST,
            email: email,
            username: username,
            password: password,
        };
    }

    public registerSuccess(): UserRegisterActionSuccess {
        return {
            type: UserActionType.REGISTER_SUCCESS,
        };
    }

    public registerFailure(error: string): UserRegisterActionFailure {
        return {
            type: UserActionType.REGISTER_FAILURE,
            error: error
        };
    }
}

export default new UserActions();
