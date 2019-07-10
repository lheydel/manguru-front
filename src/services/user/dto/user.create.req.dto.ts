import { UserDTO } from './user.dto';

export class UserCreateReqDTO extends UserDTO {

    password: string;

    constructor(email: string, username: string, password: string) {
        super({email, username});
        this.password = password;
    }

    public checkFields() {
        super.checkFields();

        // check password
        if (!this.isValidString(this.password)) {
            this.addEmptyFieldError('password');
        }
    }

    public validateMe() {
        this.checkFields();
        this.throwIfError();
    }
}
