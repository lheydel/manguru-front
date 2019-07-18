import moxios from 'moxios';
import { User } from '../../../models/user.model';
import { cookies } from '../../../utils/common';
import { Cookie, Route } from '../../../utils/properties';
import { UserLoginRequest } from '../dto/user.login.req';
import { UserLoginResponse } from '../dto/user.login.res';
import userService from './user.service';

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe('login', () => {
    const loginRoute = process.env.REACT_APP_URL_BACK + Route.LOGIN;
    const user: User = {
        id: expect.anything(),
        email: 'sandra@geffroi.com',
        username: 'Sandra Geffroi',
    };
    const userRes = new UserLoginResponse(user, 'token');
    const userReq = new UserLoginRequest(user.email, 'pwd');

    it('should fetch user and set jwt on success', async () => {
        moxios.stubRequest(loginRoute, {
            status: 200,
            response: userRes
        });

        await expect(userService.login(userReq, true)).resolves.toMatchObject(user);
        expect(cookies.get(Cookie.AUTH)).toBe(userRes.token);
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

        await expect(userService.login(userReq, false)).rejects.toThrow();
    });
});

describe('loginJwt', () => {
    const loginRoute = process.env.REACT_APP_URL_BACK + Route.LOGIN;
    const user: User = {
        id: expect.anything(),
        email: 'sandra@geffroi.com',
        username: 'Sandra Geffroi',
    };
    const userRes = new UserLoginResponse(user, 'token');
    const userReq = new UserLoginRequest(user.email, 'pwd');

    it('should fetch user and set jwt on success', async () => {
        moxios.stubRequest(loginRoute, {
            status: 200,
            response: userRes
        });

        await expect(userService.login(userReq, true)).resolves.toMatchObject(user);
        expect(cookies.get(Cookie.AUTH)).toBe(userRes.token);
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

        await expect(userService.login(userReq, false)).rejects.toThrow();
    });
});
