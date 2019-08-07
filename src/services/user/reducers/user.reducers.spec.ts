import { UserReducer } from './user.reducers';
import { UserLoginState, initialUserLoginState, UserRegisterState, initialUserRegisterState } from './user.states';
import { UserLoginAction, UserActionType, UserRegisterAction } from '../actions/user.actions';
import { User } from '../../../models/user.model';

describe('login', () => {
    const user = new User();
    const requestState: UserLoginState = {
        loading: true,
        logged: false,
    };
    const successState: UserLoginState = {
        loading: false,
        logged: true,
        user: user,
    };
    const failureState: UserLoginState = {
        loading: false,
        logged: false,
        error: expect.anything(),
    };
    const states = [undefined, initialUserLoginState, requestState, successState, failureState];

    /**
     * Test the effects of an action on all possible states
     * @param action the action to test
     * @param expectedState the expected resulting state
     */
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

    test('request', () => {
        const action: UserLoginAction = {
            type: UserActionType.LOGIN_REQUEST,
            email: user.email,
            password: 'blblbl',
            rememberMe: true,
        };
        withAllStates(action, requestState);
    });

    test('jwt request', () => {
        const action: UserLoginAction = {
            type: UserActionType.LOGIN_JWT_REQUEST
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

describe('register', () => {
    const user = new User();
    const requestState: UserRegisterState = {
        loading: true,
        registered: false,
    };
    const successState: UserRegisterState = {
        loading: false,
        registered: true,
    };
    const failureState: UserRegisterState = {
        loading: false,
        registered: false,
        error: expect.anything(),
    };
    const states = [undefined, initialUserRegisterState, requestState, successState, failureState];

    /**
     * Test the effects of an action on all possible states
     * @param action the action to test
     * @param expectedState the expected resulting state
     */
    const withAllStates = (action: UserRegisterAction, expectedState: UserRegisterState) => {
        states.forEach(state => {
            expect(UserReducer.register(state, action)).toEqual(expectedState);
        });
    };

    test('request', () => {
        const action: UserRegisterAction = {
            type: UserActionType.REGISTER_REQUEST,
            email: user.email,
            username: 'sandra@geffroi.com',
            password: 'blblbl',
        };
        withAllStates(action, requestState);
    });

    test('success', () => {
        const action: UserRegisterAction = {
            type: UserActionType.REGISTER_SUCCESS,
        };
        withAllStates(action, successState);
    });

    test('request', () => {
        const action: UserRegisterAction = {
            type: UserActionType.REGISTER_FAILURE,
            error: 'Error'
        };
        withAllStates(action, failureState);
    });
});
