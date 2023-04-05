import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
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

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.repository.findOneBy({ username });

    const salt = user.salt;
    const isUserAndPasswordCorrect =
      user && user.password === (await this.hashPassword(password, salt));

    if (!isUserAndPasswordCorrect) {
      throw new HttpException('Authentication Error', 401);
    }
    const payload: JwtPayload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  private async hashPassword(password, hash): Promise<string> {
    return bcrypt.hash(password, hash);
  }
}
