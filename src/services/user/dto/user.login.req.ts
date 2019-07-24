import { BaseDTO } from '../../common/base.dto';

export class UserLoginRequest extends BaseDTO {

    email: string;
    password: string;
    rememberMe: boolean;

    constructor(email: string, password: string, rememberMe: boolean) {
        super();
        this.email = email;
        this.password = password;
        this.rememberMe = rememberMe;
    }

    public validateMe() {
        this.checkFields();
        this.throwIfError();
    }

    protected checkFields() {
        // check email
        if (!this.isValidString(this.email)) {
            this.addEmptyFieldError('email');
        }

        // check password
        if (!this.isValidString(this.password)) {
            this.addEmptyFieldError('password');
        }
    }
}
