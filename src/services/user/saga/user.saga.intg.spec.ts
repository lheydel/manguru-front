import moxios from 'moxios';
import { expectSaga } from 'redux-saga-test-plan';
import { put } from 'redux-saga-test-plan/matchers';
import { User } from '../../../models/user.model';
import { RouteBack } from '../../../utils/properties';
import { UserActionType,
         UserLoginActionFailure, UserLoginActionRequest, UserLoginActionSuccess, UserLoginJwtActionRequest,
         UserRegisterActionSuccess, UserRegisterActionFailure, UserRegisterActionRequest } from '../actions/user.actions';
import userSaga from './user.saga';
import { UserDTO } from '../dto/user.dto';

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe('login', () => {
    const loginRoute = process.env.REACT_APP_URL_BACK + RouteBack.LOGIN;
    const user = new User();
    user.email = 'larry@golade.com';
    user.username = 'Larry Golade';

    const actSuccess: UserLoginActionSuccess = {
        type: UserActionType.LOGIN_SUCCESS,
        user: user
    };

    const actFailure: UserLoginActionFailure = {
        type: UserActionType.LOGIN_FAILURE,
        error: expect.anything()
    };

    describe('login default', () => {

        it('should call loginSuccess when login is successful', async () => {
            const actRequest: UserLoginActionRequest = {
                type: UserActionType.LOGIN_REQUEST,
                email: user.email,
                password: 'blblbl',
                rememberMe: true,
            };

            moxios.stubRequest(loginRoute, {
                status: 200,
                response: new UserDTO(user)
            });

            const saga = await expectSaga(userSaga.handleLogin, actRequest).run();
            expect(saga.effects.put).toMatchObject([put(actSuccess)]);
        });

        it('should call loginFailure when login fail', async () => {
            const actRequest: UserLoginActionRequest = {
                type: UserActionType.LOGIN_REQUEST,
                email: user.email,
                password: 'blblbl',
                rememberMe: false,
            };

            moxios.stubRequest(loginRoute, {
                status: 500
            });

            const saga = await expectSaga(userSaga.handleLogin, actRequest).run();
            expect(saga.effects.put).toMatchObject([put(actFailure)]);
        });

        it('should call loginFailure when dto is not valid', async () => {
            const actRequest: UserLoginActionRequest = {
                type: UserActionType.LOGIN_REQUEST,
                email: '',
                password: '',
                rememberMe: false,
            };

            moxios.stubRequest(loginRoute, {
                status: 200,
                response: new UserDTO(user)
            });

            const saga = await expectSaga(userSaga.handleLogin, actRequest).run();
            expect(saga.effects.put).toMatchObject([put(actFailure)]);
        });
    });

    describe('login jwt', () => {
        const actRequest: UserLoginJwtActionRequest = {
            type: UserActionType.LOGIN_JWT_REQUEST
        };

        it('should call loginSuccess when login is successful', async () => {
            moxios.stubRequest(loginRoute, {
                status: 200,
                response: new UserDTO(user)
            });

            const saga = await expectSaga(userSaga.handleLogin, actRequest).run();
            expect(saga.effects.put).toMatchObject([put(actSuccess)]);
        });

        it('should call loginFailure when login fail', async () => {
            moxios.stubRequest(loginRoute, {
                status: 500
            });

            const saga = await expectSaga(userSaga.handleLogin, actRequest).run();
            expect(saga.effects.put).toMatchObject([put(actFailure)]);
        });
    });
});

describe('register', () => {
    const registerRoute = process.env.REACT_APP_URL_BACK + RouteBack.USER;
    const email = 'larry@golade.com';
    const username = 'LarryGolade';
    const password = 'blblbl';

    const actSuccess: UserRegisterActionSuccess = {
        type: UserActionType.REGISTER_SUCCESS,
    };

    const actFailure: UserRegisterActionFailure = {
        type: UserActionType.REGISTER_FAILURE,
        error: expect.anything()
    };

    const actRequest: UserRegisterActionRequest = {
        type: UserActionType.REGISTER_REQUEST,
        email: email,
        username: username,
        password: password,
    };

    it('should call registerSuccess when registration is successful', async () => {
        moxios.stubRequest(registerRoute, {
            status: 200,
        });

        const saga = await expectSaga(userSaga.handleRegister, actRequest).run();
        expect(saga.effects.put).toMatchObject([put(actSuccess)]);
    });

    it('should call registerFailure when registration fail', async () => {
        moxios.stubRequest(registerRoute, {
            status: 500
        });

        const saga = await expectSaga(userSaga.handleRegister, actRequest).run();
        expect(saga.effects.put).toMatchObject([put(actFailure)]);
    });

    it('should call registerFailure when dto is not valid', async () => {
        const actRequestWrong: UserRegisterActionRequest = {
            ...actRequest,
            email: '',
            username: '',
            password: '',
        };

        moxios.stubRequest(registerRoute, {
            status: 200,
        });

        const saga = await expectSaga(userSaga.handleRegister, actRequestWrong).run();
        expect(saga.effects.put).toMatchObject([put(actFailure)]);
    });
});
