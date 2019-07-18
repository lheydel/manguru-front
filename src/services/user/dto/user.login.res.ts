import { UserDTO } from './user.dto';
import { User } from '../../../models/user.model';
import { BaseDTO } from '../../common/base.dto';

export class UserLoginResponse extends BaseDTO {
    user: UserDTO;
    token: string;

    constructor(user: User, token: string) {
        super();
        this.user = new UserDTO(user);
        this.token = token;
    }

    public validateMe() {
        this.checkFields();
        this.throwIfError();
    }

    protected checkFields() {
        // check user
        if (!this.user) {
            this.addEmptyFieldError('user');
        }
        try {
            this.user.validateMe();
        } catch (err) {
            this.addError('user', err.message);
        }

        // check token
        if (!this.isValidString(this.token)) {
            this.addEmptyFieldError('token');
        }
    }
}
