import { User } from "../models/User";


class UserService {

  public async getUser(userId: string) {
    return User.findById(userId);
  }

  public async setBaseCurrency(userId: string, baseCurrency: string) {
    return await User.findByIdAndUpdate(
        userId,
        { baseCurrency }, // Update
        { returnDocument: 'after' }
    );
  }

}

export const userService = new UserService();