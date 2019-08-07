import { UserDTO } from './user.dto';

export class UserCreateRequest extends UserDTO {

    password: string;

    constructor(email: string, username: string, password: string) {
        super({ email, username });
        this.password = password;
    }

    public validateMe() {
        this.checkFields();
        this.throwIfError();
    }

    protected checkFields() {
        super.checkFields();

        // check password
        if (!this.isValidString(this.password)) {
            this.addEmptyFieldError('password');
        }
    }
}
