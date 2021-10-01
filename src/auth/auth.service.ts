import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async register(
        registerUserDto: RegisterUserDto
    ) {
        const user = Object.assign(this.userRepository.create(), {
            mobile: registerUserDto.mobile,
            name: registerUserDto.name
        });

        return user.save();
    }

    async login(
        loginDto: LoginDto
    ) {

        const user = await User.validateUser(
            loginDto.name,
            loginDto.mobile
        );

        if (!user) {
            throw new UnauthorizedException('Combination of mobile and name is either wrong or not existed');
        }

        const payload = { name: user.name, id: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

}
