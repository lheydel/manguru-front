import { User } from '../../../models/user.model';
import {
    UserActionType, UserLoginActionFailure, UserLoginActionRequest,
    UserLoginActionSuccess, UserLoginJwtActionRequest
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

    // TODO others
}

export default new UserActions();
