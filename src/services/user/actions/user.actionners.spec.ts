import userActions from './user.actionners';
import { UserActionType, UserLoginAction, UserRegisterAction } from './user.actions';
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
            password: 'blblbl',
            rememberMe: true,
        };

        expect(userActions.loginRequest(action.email, action.password, true)).toEqual(action);
    });

    test('jwt request', () => {
        const action: UserLoginAction = {
            type: UserActionType.LOGIN_JWT_REQUEST
        };

        expect(userActions.loginJwtRequest()).toEqual(action);
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

describe('register', () => {

    test('request', () => {
        const action: UserRegisterAction = {
            type: UserActionType.REGISTER_REQUEST,
            email: 'larry@golade.com',
            username: 'LarryGolade',
            password: 'blblbl',
        };

        expect(userActions.registerRequest(action.email, action.username, action.password)).toEqual(action);
    });

    test('success', () => {
        const action: UserRegisterAction = {
            type: UserActionType.REGISTER_SUCCESS,
        };

        expect(userActions.registerSuccess()).toEqual(action);
    });

    test('request', () => {
        const action: UserRegisterAction = {
            type: UserActionType.REGISTER_FAILURE,
            error: 'Error'
        };

        expect(userActions.registerFailure(action.error)).toEqual(action);
    });
});
