import moxios from 'moxios';
import { User } from '../../../models/user.model';
import { RouteBack } from '../../../utils/properties';
import { UserDTO } from '../dto/user.dto';
import { UserLoginRequest } from '../dto/user.login.req';
import userService from './user.service';

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe('login', () => {
    const loginRoute = process.env.REACT_APP_URL_BACK + RouteBack.LOGIN;
    const user: User = {
        id: expect.anything(),
        email: 'sandra@geffroi.com',
        username: 'Sandra Geffroi',
    };
    const userRes = new UserDTO(user);

    it('should fetch user and set jwt on success', async () => {
        moxios.stubRequest(loginRoute, {
            status: 200,
            response: userRes
        });

        await expect(userService.login(user.email, 'pwd', true)).resolves.toMatchObject(user);
    });

    it.each`
        status
        ${400}
        ${404}
        ${500}
    `('should throw on status code $status', async (status) => {
        moxios.stubRequest(loginRoute, {
            status: status
        });

        await expect(userService.login(user.email, 'pwd', true)).rejects.toThrow();
    });
});

describe('loginJwt', () => {
    const loginRoute = process.env.REACT_APP_URL_BACK + RouteBack.LOGIN;
    const user: User = {
        id: expect.anything(),
        email: 'sandra@geffroi.com',
        username: 'Sandra Geffroi',
    };
    const userRes = new UserDTO(user);

    it('should fetch user and set jwt on success', async () => {
        moxios.stubRequest(loginRoute, {
            status: 200,
            response: userRes
        });

        await expect(userService.loginJwt()).resolves.toMatchObject(user);
    });
});
