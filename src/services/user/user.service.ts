import { User } from '../../models/user.model';
import axios from 'axios';
import { requestConfig } from '../../utils/common';
import { UserDTO } from './dto/user.dto';
import { UserCreateReqDTO } from './dto/user.create.req.dto';

class UserService {

  constructor() {
    this.login = this.login.bind(this);
  }

  public async login(dto: UserCreateReqDTO): Promise<User> {
    // TODO
    try {
      const response = await axios.post<UserDTO>(process.env.REACT_APP_URL_BACK + '/user', {
        email: dto.email,
        password: dto.password,
        username: dto.username
      }, requestConfig);

      return new UserDTO(response.data).toUser();

    } catch (err) {
      throw new Error(err);
    }
    // return response.data.toUser();
  }
}

export default new UserService();
