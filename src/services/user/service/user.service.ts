import { t } from '@lingui/macro';
import axios from 'axios';
import { User } from '../../../models/user.model';
import { cookies, requestConfig } from '../../../utils/common';
import { Cookie, Route } from '../../../utils/properties';
import i18nService from '../../i18n/service/i18n.service';
import { UserDTO } from '../dto/user.dto';
import { UserLoginRequest } from '../dto/user.login.req';
import { UserLoginResponse } from '../dto/user.login.res';

class UserService {

    constructor() {
        this.login = this.login.bind(this);
    }

    /**
     * Classic login request with email and password
     * @param dto the dto containing the info to request a login
     * @param rememberMe define the lifespan of the jwt cookie
     */
    public async login(dto: UserLoginRequest, rememberMe: boolean): Promise<User> {
        try {
            // request login to back
            const response = await axios.post<UserLoginResponse>(process.env.REACT_APP_URL_BACK + Route.LOGIN, dto, requestConfig());

            // login success
            if (rememberMe) {
                cookies.set(Cookie.AUTH, response.data.token, { path: '/' });
            }

            localStorage.setItem(Cookie.AUTH, response.data.token);
            return new UserDTO(response.data.user).toUser();

        } catch (err) {
            // login failed
            let msg = i18nService.i18n._(t`An error occured. Please try again later`);
            if (err.response != null) {
                switch (err.response.status.status) {
                    // wrong credentials
                    case 404:
                    case 400:
                        msg = i18nService.i18n._(t`Email or password incorrect`);
                        break;

                    // server error
                    case 500:
                    default:
                        msg = i18nService.i18n._(t`An error occured. Please try again later`);
                }
            }
            throw new Error(msg);
        }
    }

    /**
     * Login request from a JWT from the cookies
     */
    public async loginJwt(): Promise<User> {
        try {
            // request login to back
            const response = await axios.get<UserDTO>(process.env.REACT_APP_URL_BACK + Route.LOGIN, requestConfig());

            // login success
            return new UserDTO(response.data).toUser();

        } catch (err) {
            // login failed
            throw new Error(err);
        }
    }
}

export default new UserService();
