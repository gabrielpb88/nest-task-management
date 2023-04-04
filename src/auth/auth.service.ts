import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const found = await this.repository.findOneBy({ username });
    if (found) {
      throw new ConflictException(`username ${username} already being used`);
    }
    const user = this.repository.create();
    user.username = username;
    user.salt = await bcrypt.genSalt(12);
    user.password = await this.hashPassword(password, user.salt);

    return this.repository.signUp(user);
  }

  private async hashPassword(password, hash): Promise<string> {
    return bcrypt.hash(password, hash);
  }
}
