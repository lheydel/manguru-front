import { fork, all, takeLeading, call, put } from 'redux-saga/effects';
import { UserActionType, UserLoginActionRequest } from '../actions/user.actions';
import userService from '../service/user.service';
import userActions from '../actions/user.actionners';
import { BaseSaga } from '../../common/base.saga';
import { UserCreateReqDTO } from '../dto/user.create.req';
import { User } from '../../../models/user.model';

class UserSaga implements BaseSaga {

    constructor() {
        this.makeSaga = this.makeSaga.bind(this);
        this.watchLoginRequest = this.watchLoginRequest.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    public * makeSaga() {
        yield all([fork(this.watchLoginRequest)]);
    }

    public * watchLoginRequest() {
        yield takeLeading(UserActionType.LOGIN_REQUEST, this.handleLogin);
    }

    public * handleLogin(action: UserLoginActionRequest) {
        try {
            const dto = new UserCreateReqDTO(action.email, 'username', action.password);
            dto.validateMe();

            const result: User = yield call(userService.login, dto);
            yield put(userActions.loginSuccess(result));
        } catch (err) {
            yield put(userActions.loginFailure(err));
        }
    }
}

export default new UserSaga();
