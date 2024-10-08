import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

function signInDto() {
    interface SignInDto {
        username: string;
        password: string;
    }
}

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

        @HttpCode(HttpStatus.OK)
        @Post('login')

        signIn(@Body() signInDto: Record<string, any>) {
            return this.authService.signIn(signInDto.username, signInDto.password);
        }
    }

