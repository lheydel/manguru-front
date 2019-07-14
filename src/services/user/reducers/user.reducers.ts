import { initialUserLoginState, UserLoginState } from './user.states';
import { UserLoginAction, UserActionType } from '../actions/user.actions';
import { combineReducers } from 'redux';

export class UserReducer {

    public static makeReducer() {
        return combineReducers({
            login: UserReducer.login
        });
    }

    public static login(state: UserLoginState = initialUserLoginState, action: UserLoginAction): UserLoginState {
        switch (action.type) {
            case UserActionType.LOGIN_REQUEST:
                return { loading: true, logged: false };

            case UserActionType.LOGIN_SUCCESS:
                return { loading: false, logged: true, user: action.user };

            case UserActionType.LOGIN_FAILURE:
                return { loading: false, logged: false, error: action.error };

            default:
                return state;
        }
    }

    // public static logout(state: UserLoginState, action: LogoutAction) {

    // }
}

export default UserReducer.makeReducer();
