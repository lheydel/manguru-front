import { User } from '../../../models/user.model';
import axios from 'axios';
import { requestConfig } from '../../../utils/common';
import { UserDTO } from '../dto/user.dto';
import { UserCreateReqDTO } from '../dto/user.create.req';

class UserService {

  constructor() {
    this.login = this.login.bind(this);
  }

  public async login(dto: UserCreateReqDTO): Promise<User> {
    // TODO actual login and not create user
    try {
      const response = await axios.post<UserDTO>(process.env.REACT_APP_URL_BACK + '/user', dto, requestConfig);
      return new UserDTO(response.data).toUser();

    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new UserService();
