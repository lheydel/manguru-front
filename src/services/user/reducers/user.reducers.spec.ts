import { UserReducer } from './user.reducers';
import { UserLoginState, initialUserLoginState } from './user.states';
import { UserLoginAction, UserActionType } from '../actions/user.actions';
import { User } from '../../../models/user.model';

describe('login', () => {
    const user = new User();
    const requestState: UserLoginState = {
        loading: true,
        logged: false
    };
    const successState: UserLoginState = {
        loading: false,
        logged: true,
        user: user
    };
    const failureState: UserLoginState = {
        loading: false,
        logged: false,
        error: expect.anything()
    };
    const states = [undefined, initialUserLoginState, requestState, successState, failureState];

    const withAllStates = (action: UserLoginAction, expectedState: UserLoginState) => {
        states.forEach(state => {
            expect(UserReducer.login(state, action)).toEqual(expectedState);
        });
    };

    beforeAll(() => {
        user.id = 'id';
        user.email = 'tim@yfeppeur.com';
        user.username = 'Tim Yfeppeur';
    });

    test('request for the first time', () => {
        const action: UserLoginAction = {
            type: UserActionType.LOGIN_REQUEST,
            email: user.email,
            password: 'blblbl'
        };
        withAllStates(action, requestState);
    });

    test('success', () => {
        const action: UserLoginAction = {
            type: UserActionType.LOGIN_SUCCESS,
            user: user
        };
        withAllStates(action, successState);
    });

    test('request', () => {
        const action: UserLoginAction = {
            type: UserActionType.LOGIN_FAILURE,
            error: 'Error'
        };
        withAllStates(action, failureState);
    });
});
