import { expectSaga } from 'redux-saga-test-plan';
import { User } from '../../../models/user.model';
import { UserActionType, UserLoginActionFailure, UserLoginActionRequest,
         UserLoginActionSuccess, UserLoginJwtActionRequest, UserLoginAction } from '../actions/user.actions';
import { UserLoginRequest } from '../dto/user.login.req';
import userService from '../service/user.service';
import userSaga from './user.saga';

describe('overall', () => {
    it('should fork every saga', () => {
        return expectSaga(userSaga.makeSaga)
            .fork(userSaga.watchLoginRequest)
            .run();
        // TODO add others
    });
});

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

    const mockDto = jest.fn();

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
        UserLoginRequest.prototype.validateMe = mockDto;
        userService.login = jest.fn().mockResolvedValue(user);
        userService.loginJwt = jest.fn().mockResolvedValue(user);

        return expectSaga(userSaga.handleLogin, actRequest)
                .put(actSuccess)
                .run();
    });

    it('should call loginFailure when service throws', () => {
        UserLoginRequest.prototype.validateMe = mockDto;
        userService.login = jest.fn().mockRejectedValue(new Error());
        userService.loginJwt = jest.fn().mockRejectedValue(new Error());

        return expectSaga(userSaga.handleLogin, actRequest)
                .put(actFailure)
                .run();
    });
});
