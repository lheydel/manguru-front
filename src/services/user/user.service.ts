import { User } from '../../models/user.model';

class UserService {

  public async login(email: string, password: string): Promise<User> {
    // TODO
    return new User(email, password);
  }
}

export default new UserService();
