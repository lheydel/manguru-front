import { UserActionType, UserLoginActionRequest, UserLoginActionSuccess, UserLoginActionFailure } from './user.actions';
import { User } from '../../../models/user.model';

/**
 * Define actions on users
 * Possible actions:
 *  - login
 *  - logout
 *  - register
 *  - remove
 */
class UserActions {

    public loginRequest(email: string, password: string): UserLoginActionRequest {
        return {
            type: UserActionType.LOGIN_REQUEST,
            email: email,
            password: password
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
