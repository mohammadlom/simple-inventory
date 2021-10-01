import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(
        @Body() registerUserDto: RegisterUserDto
    ): Promise<User> {
        return this.authService.register(registerUserDto);
    }

    @HttpCode(200)
    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
    ): Promise<any> {
        return this.authService.login(loginDto);
    }

}
