import userActions from './user.actionners';
import { UserActionType, UserLoginAction } from './user.actions';
import { User } from '../../../models/user.model';

describe('login', () => {
    const user = new User();

    beforeAll(() => {
        user.id = 'id';
        user.email = 'tim@yfeppeur.com';
        user.username = 'Tim Yfeppeur';
    });

    test('request', () => {
        const action: UserLoginAction = {
            type: UserActionType.LOGIN_REQUEST,
            email: user.email,
            password: 'blblbl'
        };

        expect(userActions.loginRequest(action.email, action.password)).toEqual(action);
    });

    test('success', () => {
        const action: UserLoginAction = {
            type: UserActionType.LOGIN_SUCCESS,
            user: user
        };

        expect(userActions.loginSuccess(user)).toEqual(action);
    });

    test('request', () => {
        const action: UserLoginAction = {
            type: UserActionType.LOGIN_FAILURE,
            error: 'Error'
        };

        expect(userActions.loginFailure(action.error)).toEqual(action);
    });
});
