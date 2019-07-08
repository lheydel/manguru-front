import { initialUserLoginState, UserLoginState } from './user.states';
import { UserLoginAction, UserActionType } from '../actions/user.types';
import { combineReducers } from 'redux';

class UserReducer {

    public static makeReducer() {
        return combineReducers({
            login: UserReducer.login
        });
    }

    public static login(state: UserLoginState = initialUserLoginState, action: UserLoginAction): UserLoginState {
        switch (action.type) {
            case UserActionType.LOGIN_REQUEST:
                return { ...state, loading: true };

            case UserActionType.LOGIN_SUCCESS:
                return { ...state, loading: false, logged: true, user: action.user };

            case UserActionType.LOGIN_ERROR:
                return { ...state, loading: false, logged: false, error: action.error };

            default:
                return state;
        }
    }

    // public static logout(state: UserState, action: LogoutAction) {

    // }
}

export default UserReducer.makeReducer();
