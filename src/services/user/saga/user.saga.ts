import { fork, all, takeLeading, call, put } from 'redux-saga/effects';
import { UserActionType, UserLoginActionRequest } from '../actions/user.types';
import userService from '../user.service';
import userActions from '../actions/user.actions';
import { BaseSaga } from '../../common/base.saga';
import { UserCreateReqDTO } from '../dto/user.create.req.dto';
import { User } from '../../../models/user.model';

class UserSaga implements BaseSaga {

    public * makeSaga() {
        yield all([fork([this, this.watchLoginRequest])]);
    }

    public * watchLoginRequest() {
        yield takeLeading(UserActionType.LOGIN_REQUEST, this.handleLogin);
    }

    public * handleLogin(action: UserLoginActionRequest) {
        try {
            const dto = new UserCreateReqDTO(action.email, 'username', action.password);
            const result: User = yield call(userService.login, dto);
            yield put(userActions.loginSuccess(result));
        } catch (err) {
            yield put(userActions.loginError(err.stack || 'An unknown error has occured'));
        }
    }
}

export default new UserSaga();
