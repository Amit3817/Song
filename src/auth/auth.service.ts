import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity'; 
import { AuthCredentialsDto } from './auth-credentials.dto'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersService.createUser({ username, password: hashedPassword });
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user: User = await this.usersService.validateUserPassword(authCredentialsDto);
    const payload = { username: user.username, sub: user.id }; 
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
