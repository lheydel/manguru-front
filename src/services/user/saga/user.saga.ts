import { all, call, fork, put, takeLeading } from 'redux-saga/effects';
import { User } from '../../../models/user.model';
import { BaseSaga } from '../../common/base.saga';
import userActions from '../actions/user.actionners';
import { UserActionType, UserLoginActionRequest, UserLoginJwtActionRequest } from '../actions/user.actions';
import { UserLoginRequest } from '../dto/user.login.req';
import userService from '../service/user.service';

class UserSaga implements BaseSaga {

    constructor() {
        this.makeSaga = this.makeSaga.bind(this);
        this.watchLoginRequest = this.watchLoginRequest.bind(this);
        this.watchLoginJwtRequest = this.watchLoginJwtRequest.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this._loginCrendentials = this._loginCrendentials.bind(this);
        this._loginJwt = this._loginJwt.bind(this);
    }

    public * makeSaga() {
        yield all([fork(this.watchLoginRequest), fork(this.watchLoginJwtRequest)]);
    }

    public * watchLoginRequest() {
        yield takeLeading(UserActionType.LOGIN_REQUEST, this.handleLogin);
    }

    public * watchLoginJwtRequest() {
        yield takeLeading(UserActionType.LOGIN_JWT_REQUEST, this.handleLogin);
    }

    /**
     * Handle the login related actions
     */
    public * handleLogin(action: UserLoginActionRequest | UserLoginJwtActionRequest) {
        try {
            const result = action.type === UserActionType.LOGIN_REQUEST
                           ? yield call(this._loginCrendentials, action)
                           : yield call(this._loginJwt);
            yield put(userActions.loginSuccess(result));
        } catch (err) {
            yield put(userActions.loginFailure(err.message));
        }
    }

    /**
     * Handle the default login requests (with email and password)
     */
    private async _loginCrendentials(action: UserLoginActionRequest): Promise<User> {
        const dto = new UserLoginRequest(action.email, action.password, action.rememberMe);
        dto.validateMe();

        return await userService.login(dto);
    }

    /**
     * Handle the jwt login requests (with only JWT)
     */
    private async _loginJwt() {
        return await userService.loginJwt();
    }
}

export default new UserSaga();
