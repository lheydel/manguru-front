import { UserCreateReqDTO } from './user.create.req';

describe('validateMe', () => {
    it('should be ok', () => {
        const data = {
            email: 'larry@golade.com',
            username: 'LarryGolade',
            password: 'blblbl'
        };
        const dto = new UserCreateReqDTO(data.email, data.username, data.password);
        expect(dto.validateMe.bind(dto)).not.toThrow();
    });

    it('should throw an error with the empty fields', () => {
        const data = {
            email: '',
            username: '',
            password: ''
        };
        const dto = new UserCreateReqDTO(data.email, data.username, data.password);
        const errRegex = Object.keys(data).reduce((regex, key) => regex + '||' + key);
        expect(dto.validateMe.bind(dto)).toThrowError(RegExp(errRegex));
    });
});
