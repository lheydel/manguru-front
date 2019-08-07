import { expectSaga } from 'redux-saga-test-plan';
import { User } from '../../../models/user.model';
import {
    UserActionType,
    UserLoginActionFailure, UserLoginActionRequest, UserLoginActionSuccess, UserLoginJwtActionRequest,
    UserRegisterActionSuccess, UserRegisterActionFailure, UserRegisterActionRequest
} from '../actions/user.actions';
import userService from '../service/user.service';
import userSaga from './user.saga';

describe('overall', () => {
    it('should fork every saga', () => {
        return expectSaga(userSaga.makeSaga)
            .fork(userSaga.watchLoginRequest)
            .fork(userSaga.watchRegisterRequest)
            .run();
    });
});

describe('login', () => {
    const actDefaultRequest: UserLoginActionRequest = {
        type: UserActionType.LOGIN_REQUEST,
        email: '',
        password: '',
        rememberMe: false,
    };

    const actJwtRequest: UserLoginJwtActionRequest = {
        type: UserActionType.LOGIN_JWT_REQUEST,
    };

    describe.each`
        type         | actRequest           | watchFn
        ${'default'} | ${actDefaultRequest} | ${userSaga.watchLoginRequest}
        ${'jwt'}     | ${actJwtRequest}     | ${userSaga.watchLoginJwtRequest}
    `('login $type', ({ actRequest, watchFn }) => {
        const user = new User();

        const actSuccess: UserLoginActionSuccess = {
            type: UserActionType.LOGIN_SUCCESS,
            user: user
        };

        const actFailure: UserLoginActionFailure = {
            type: UserActionType.LOGIN_FAILURE,
            error: ''
        };

        it('should call handleLogin on request', async () => {
            return expectSaga(watchFn)
                    .dispatch(actRequest)
                    .call(userSaga.handleLogin, actRequest)
                    .run();
        });

        it('should call loginSuccess when service returns user', () => {
            userService.login = jest.fn().mockResolvedValue(user);
            userService.loginJwt = jest.fn().mockResolvedValue(user);

            return expectSaga(userSaga.handleLogin, actRequest)
                    .put(actSuccess)
                    .run();
        });

        it('should call loginFailure when service throws', () => {
            userService.login = jest.fn().mockRejectedValue(new Error());
            userService.loginJwt = jest.fn().mockRejectedValue(new Error());

            return expectSaga(userSaga.handleLogin, actRequest)
                    .put(actFailure)
                    .run();
        });
    });
});

describe('register', () => {
    const actRequest: UserRegisterActionRequest = {
        type: UserActionType.REGISTER_REQUEST,
        email: '',
        username: '',
        password: '',
    };

    const actSuccess: UserRegisterActionSuccess = {
        type: UserActionType.REGISTER_SUCCESS,
    };

    const actFailure: UserRegisterActionFailure = {
        type: UserActionType.REGISTER_FAILURE,
        error: ''
    };

    it('should call handleRegister on request', async () => {
        return expectSaga(userSaga.watchRegisterRequest)
                .dispatch(actRequest)
                .call(userSaga.handleRegister, actRequest)
                .run();
    });

    it('should call registerSuccess when service returns without error', () => {
        userService.register = jest.fn();

        return expectSaga(userSaga.handleRegister, actRequest)
                .put(actSuccess)
                .run();
    });

    it('should call registerFailure when service throws', () => {
        userService.register = jest.fn().mockRejectedValue(new Error());

        return expectSaga(userSaga.handleRegister, actRequest)
                .put(actFailure)
                .run();
    });
});
