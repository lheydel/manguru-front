import { User } from '../../models/user.model';
import axios from 'axios';
import { requestConfig } from '../../utils/common';

class UserService {

  constructor() {
    this.login = this.login.bind(this);
  }

  public async login(email: string, password: string): Promise<User> {
    // TODO
    const response = await axios.get<string>(process.env.REACT_APP_URL_BACK + '/user/name', requestConfig);
    return new User(response.data, password);
  }
}

export default new UserService();
