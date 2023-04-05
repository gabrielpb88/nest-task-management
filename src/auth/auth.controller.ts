import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly service: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.service.signUp(authCredentialsDto);
  }

  @Post('signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.service.signin(authCredentialsDto);
  }
}
