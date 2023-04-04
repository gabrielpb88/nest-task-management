import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { assignToObject } from '@nestjs/core/repl/assign-to-object.util';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const user = this.repository.create();
    assignToObject(user, authCredentialsDto);
    return this.repository.save(user);
  }
}
