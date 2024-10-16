import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; // Assuming you have a UsersModule

@Module({
  imports: [
    UsersModule, // Import the UsersModule if you are using it for user management
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Use your own secret key or load from env
      signOptions: { expiresIn: '60s' }, // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
