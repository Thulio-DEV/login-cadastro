import { Body, 
    Controller, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Post, 
    UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { Request } from '@nestjs/common';

export class SignInDto {
    password: string;
    email: string;
}

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

        @HttpCode(HttpStatus.OK)
        @Post('login')
        async signIn(@Body() signInDto: any) {
            console.log(signInDto)
            if(!signInDto.password && !signInDto.email) {
                console.log("Vou cair no erro ")
                return {
                    message: 'password or email must be provided.',
                statusCode: HttpStatus.BAD_REQUEST,
                };
            }
            console.log('Username:', signInDto.email, 'Password:', signInDto.password);
            return this.authService.signIn(signInDto.email, signInDto.password);
        }

        @UseGuards(AuthGuard)
        @Get('profile')
        getProfile(@Request() req) {
            console.log("req", req)
            return req.user;
        }

    }

