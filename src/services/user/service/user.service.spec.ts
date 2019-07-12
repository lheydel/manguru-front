import userService from './user.service';
import moxios from 'moxios';
import { UserDTO } from '../dto/user.dto';
import { UserCreateReqDTO } from '../dto/user.create.req';
import { User } from '../../../models/user.model';

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe('login', () => {
    // TODO adapt tests when actual login will be developped
    const user: User = {
        id: expect.anything(),
        email: 'sandra@geffroi.com',
        username: 'Sandra Geffroi'
    };
    const userDto = new UserDTO(user);
    const userReq = new UserCreateReqDTO('', '', '');

    it('should fetch user on success', async () => {
        moxios.stubRequest(process.env.REACT_APP_URL_BACK + '/user', {
            status: 200,
            response: userDto
        });

        await expect(userService.login(userReq)).resolves.toMatchObject(user);
    });

    it('should throw on failure', async () => {
        moxios.stubRequest(process.env.REACT_APP_URL_BACK + '/user', {
            status: 500
        });

        await expect(userService.login(userReq)).rejects.toThrow();
    });
});
