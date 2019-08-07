import { initialUserLoginState, UserLoginState, UserRegisterState, initialUserRegisterState } from './user.states';
import { UserLoginAction, UserActionType, UserRegisterAction } from '../actions/user.actions';
import { combineReducers } from 'redux';

export class UserReducer {

    public static makeReducer() {
        return combineReducers({
            login: UserReducer.login,
            register: UserReducer.register,
        });
    }

    public static login(state: UserLoginState = initialUserLoginState, action: UserLoginAction): UserLoginState {
        switch (action.type) {
            case UserActionType.LOGIN_REQUEST:
            case UserActionType.LOGIN_JWT_REQUEST:
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

    public static register(state: UserRegisterState = initialUserRegisterState, action: UserRegisterAction): UserRegisterState {
        switch (action.type) {
            case UserActionType.REGISTER_REQUEST:
                return { loading: true, registered: false };

            case UserActionType.REGISTER_SUCCESS:
                return { loading: false, registered: true};

            case UserActionType.REGISTER_FAILURE:
                return { loading: false, registered: false, error: action.error };

            default:
                return state;
        }
    }
}

export default UserReducer.makeReducer();
