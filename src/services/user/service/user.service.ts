import { t } from '@lingui/macro';
import axios from 'axios';
import { User } from '../../../models/user.model';
import { requestConfig } from '../../../utils/common';
import { RouteBack } from '../../../utils/properties';
import i18nService from '../../i18n/service/i18n.service';
import { UserCreateRequest } from '../dto/user.create.req';
import { UserDTO } from '../dto/user.dto';
import { UserLoginRequest } from '../dto/user.login.req';

class UserService {

    /**
     * Classic login request with email and password
     * @param email the email of the account to log in
     * @param password the password of the account to log in
     * @param rememberMe whether to remember the user or not for further logins
     */
    public async login(email: string, password: string, rememberMe: boolean): Promise<User> {
        try {
            // format request data
            const dto = new UserLoginRequest(email, password, rememberMe);
            dto.validateMe();

            // request login to back
            const response = await axios.post<UserDTO>(process.env.REACT_APP_URL_BACK + RouteBack.LOGIN, dto, requestConfig);

            // login success
            return new UserDTO(response.data).toUser();

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
            const response = await axios.get<UserDTO>(process.env.REACT_APP_URL_BACK + RouteBack.LOGIN, requestConfig);

            // login success
            return new UserDTO(response.data).toUser();

        } catch (err) {
            // login failed
            throw new Error(err);
        }
    }

    /**
     * User registration request
     */
    public async register(email: string, username: string, password: string) {
        try {
            // format request data
            const dto = new UserCreateRequest(email, username, password);
            dto.validateMe();

            // request registration to back
            await axios.post<UserDTO>(process.env.REACT_APP_URL_BACK + RouteBack.USER, dto, requestConfig);

        } catch (err) {
            // registration failed
            let msg = i18nService.i18n._(t`An error occured. Please try again later`);
            if (err.response != null) {
                switch (err.response.status.status) {
                    // wrong credentials
                    case 400:
                        msg = i18nService.i18n._(t`Some information are invalid`);
                        break;

                    // duplicate
                    case 420:
                        msg = i18nService.i18n._(t`This email already exists`);
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
}

export default new UserService();
