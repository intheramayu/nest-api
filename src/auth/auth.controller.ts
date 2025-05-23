
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
import { Public } from 'src/resource/users/users.decorator';
import { User } from 'src/resource/users/users.decorator';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Post('refresh-token')
    async refreshToken(@Body('refresh_token') refresh_token: string) {
        return this.authService.refreshAccessToken(refresh_token);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

    // @UseGuards(AuthGuard)
    @Get('profil')
    getProfil(@User() user: any) {
      return user;
    }
  }
  