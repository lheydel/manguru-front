import userSaga from './user.saga';
import { expectSaga } from 'redux-saga-test-plan';
import { UserLoginActionRequest, UserLoginActionSuccess, UserLoginActionFailure, UserActionType } from '../actions/user.actions';
import moxios from 'moxios';
import { User } from '../../../models/user.model';
import { UserDTO } from '../dto/user.dto';
import { put } from 'redux-saga-test-plan/matchers';

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe('login', () => {
    const user = new User();
    user.email = 'larry@golade.com';
    user.username = 'Larry Golade';

    const actFailure: UserLoginActionFailure = {
        type: UserActionType.LOGIN_FAILURE,
        error: expect.anything()
    };

    it('should call loginSuccess when login is successful', async () => {
        const actRequest: UserLoginActionRequest = {
            type: UserActionType.LOGIN_REQUEST,
            email: user.email,
            password: 'blblbl'
        };

        const actSuccess: UserLoginActionSuccess = {
            type: UserActionType.LOGIN_SUCCESS,
            user: user
        };

        moxios.stubRequest(process.env.REACT_APP_URL_BACK + '/user', {
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
            password: 'blblbl'
        };

        moxios.stubRequest(process.env.REACT_APP_URL_BACK + '/user', {
            status: 500
        });

        const saga = await expectSaga(userSaga.handleLogin, actRequest).run();
        expect(saga.effects.put).toMatchObject([put(actFailure)]);
    });

    it('should call loginFailure when dto is not valid', async () => {
        const actRequest: UserLoginActionRequest = {
            type: UserActionType.LOGIN_REQUEST,
            email: '',
            password: ''
        };

        moxios.stubRequest(process.env.REACT_APP_URL_BACK + '/user', {
            status: 200,
            response: new UserDTO(user)
        });

        const saga = await expectSaga(userSaga.handleLogin, actRequest).run();
        expect(saga.effects.put).toMatchObject([put(actFailure)]);
    });
});
