
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/resource/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/resource/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string,  refresh_token: string }> {
    const user = await this.usersService.findOne(username);
    let isMatch = false;
    
    if( user?.password ){
      isMatch = await bcrypt.compare(pass, user!.password);
    }
    
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { id: user?.id, username: user?.username, role: user?.role, };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.createRefreshToken(user!)
    };
    
  }

  async createRefreshToken(user: User): Promise<string> {
      const refresh_token = this.jwtService.sign({}, { expiresIn: '7d' });
      user.refresh_token = refresh_token;
      await this.usersService.update(user.id, user);
      return refresh_token;
  }

  async refreshAccessToken(refresh_token: string) {
    try {
        const decoded = this.jwtService.verify(refresh_token); 
        const user = await this.usersService.findOne({ refresh_token });
        if (!user) {
            throw new UnauthorizedException('Invalid refresh token');
        }            const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: await this.createRefreshToken(user!)
        };
    } catch (e) {
        throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
