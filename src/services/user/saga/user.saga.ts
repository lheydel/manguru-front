import { all, call, fork, put, takeLeading } from 'redux-saga/effects';
import { User } from '../../../models/user.model';
import { BaseSaga } from '../../common/base.saga';
import userActions from '../actions/user.actionners';
import { UserActionType, UserLoginActionRequest, UserLoginJwtActionRequest, UserRegisterActionRequest } from '../actions/user.actions';
import userService from '../service/user.service';

class UserSaga extends BaseSaga {

    constructor() {
        super();
        this.makeSaga = this.makeSaga.bind(this);
        /* LOGIN */
        this.watchLoginRequest = this.watchLoginRequest.bind(this);
        this.watchLoginJwtRequest = this.watchLoginJwtRequest.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this._loginCrendentials = this._loginCrendentials.bind(this);
        this._loginJwt = this._loginJwt.bind(this);
        /* REGISTER */
        this.watchRegisterRequest = this.watchRegisterRequest.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    public * makeSaga() {
        yield all([
            fork(this.watchLoginRequest),
            fork(this.watchLoginJwtRequest),
            fork(this.watchRegisterRequest),
        ]);
    }

    /* LOGIN */
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
        action.type === UserActionType.LOGIN_REQUEST
            ? yield * this.basicSaga(this._loginCrendentials, [action], userActions.loginSuccess, userActions.loginFailure)
            : yield * this.basicSaga(this._loginJwt, [], userActions.loginSuccess, userActions.loginFailure);
    }

    /**
     * Handle the default login requests (with email and password)
     */
    private async _loginCrendentials(action: UserLoginActionRequest): Promise<User> {
        return await userService.login(action.email, action.password, action.rememberMe);
    }

    /**
     * Handle the jwt login requests (with only JWT)
     */
    private async _loginJwt() {
        return await userService.loginJwt();
    }


    /* REGISTER */
    public * watchRegisterRequest() {
        yield takeLeading(UserActionType.REGISTER_REQUEST, this.handleRegister);
    }

    /**
     * Handle the register related actions
     */
    public * handleRegister(action: UserRegisterActionRequest) {
        yield * this.basicSaga(userService.register, [action.email, action.username, action.password],
                               userActions.registerSuccess, userActions.registerFailure);
    }
}

export default new UserSaga();
