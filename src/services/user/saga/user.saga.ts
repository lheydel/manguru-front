import { fork, all, takeLeading, call, put } from 'redux-saga/effects';
import { UserActionType, UserLoginActionRequest } from '../actions/user.types';
import userService from '../user.service';
import userActions from '../actions/user.actions';
import { BaseSaga } from '../../common/base.saga';

class UserSaga implements BaseSaga {

    public * makeSaga() {
        yield all([fork([this, this.watchLoginRequest])]);
    }

    public * watchLoginRequest() {
        yield takeLeading(UserActionType.LOGIN_REQUEST, this.handleLogin);
    }

    public * handleLogin(action: UserLoginActionRequest) {
        const result = yield call(userService.login, action.email, action.password);

        try {
            if (result.error) {
                yield put(userActions.loginError(result.error));
            } else {
                yield put(userActions.loginSuccess(result));
            }
        } catch (err) {
            put(userActions.loginError(err.stack || 'An unknown error has occured'));
        }
    }
}

export default new UserSaga();
