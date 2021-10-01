import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { LoginType } from './types/login.type';

@Controller('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService
    ) { }

    @ApiResponse({
        description: 'User successfully registered',
        type: User,
        status: 201
    })
    @Post('register')
    async register(
        @Body() registerUserDto: RegisterUserDto
    ): Promise<User> {
        return this.authService.register(registerUserDto);
    }

    @ApiResponse({
        description: 'User successfully logged in',
        type: LoginType,
        status: 200
    })
    @HttpCode(200)
    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
    ): Promise<any> {
        return this.authService.login(loginDto);
    }

}
