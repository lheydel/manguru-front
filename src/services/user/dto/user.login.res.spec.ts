import { UserLoginResponse } from './user.login.res';
import { User } from '../../../models/user.model';

it('should be defined', () => {
    expect(new UserLoginResponse(new User(), 'token')).toBeDefined();
});

describe('validateMe', () => {
    it('should be ok', () => {
        const data = {
            user: {
                ...new User(),
                email: 'larry@golade.com',
                username: 'Larry Golade',
            },
            token: 'token',
        };
        const dto = new UserLoginResponse(data.user, data.token);
        expect(dto.validateMe.bind(dto)).not.toThrow();
    });

    it('should throw an error with the empty fields', () => {
        const data = {
            user: new User(),
            token: '',
        };
        const dto = new UserLoginResponse(data.user, data.token);
        const errRegex = Object.keys(data).reduce((regex, key) => regex + '||' + key);
        expect(dto.validateMe.bind(dto)).toThrowError(RegExp(errRegex));
    });
});
