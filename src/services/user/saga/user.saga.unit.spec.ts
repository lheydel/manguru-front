import userService from '../service/user.service';
import { UserCreateReqDTO } from '../dto/user.create.req';
import { expectSaga } from 'redux-saga-test-plan';
import userSaga from './user.saga';
import { UserLoginActionRequest, UserActionType, UserLoginActionSuccess, UserLoginActionFailure } from '../actions/user.actions';
import { User } from '../../../models/user.model';

describe('overall', () => {
    it('should fork every saga', () => {
        return expectSaga(userSaga.makeSaga)
                .fork(userSaga.watchLoginRequest)
                .run();
                // TODO add others
    });
});

describe('login', () => {
    const user = new User();

    const mockDto = jest.fn();

    const actRequest: UserLoginActionRequest = {
        type: UserActionType.LOGIN_REQUEST,
        email: '',
        password: ''
    };

    const actSuccess: UserLoginActionSuccess = {
        type: UserActionType.LOGIN_SUCCESS,
        user: user
    };

    const actFailure: UserLoginActionFailure = {
        type: UserActionType.LOGIN_FAILURE,
        error: ''
    };

    it('should call handleLogin', async () => {
        return expectSaga(userSaga.watchLoginRequest)
                .dispatch(actRequest)
                .call(userSaga.handleLogin, actRequest)
                .run();
    });

    it('should call loginSuccess when service returns user', () => {
        UserCreateReqDTO.prototype.validateMe = mockDto;
        userService.login = jest.fn().mockResolvedValue(user);

        return expectSaga(userSaga.handleLogin, actRequest)
                .put(actSuccess)
                .run();
    });

    it('should call loginFailure when service throws', () => {
        UserCreateReqDTO.prototype.validateMe = mockDto;
        userService.login = jest.fn().mockRejectedValue('');

        return expectSaga(userSaga.handleLogin, actRequest)
                .put(actFailure)
                .run();
    });
});
