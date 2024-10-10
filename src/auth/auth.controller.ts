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

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

        @HttpCode(HttpStatus.OK)
        @Post('login')
        async signIn(@Body() signInDto: any) {
            if(!signInDto.password && !signInDto.email) {
                return {
                    message: 'password or email must be provided.',
                statusCode: HttpStatus.BAD_REQUEST,
                };
            }
            return this.authService.signIn(signInDto.email, signInDto.password);
        }

        @UseGuards(AuthGuard)
        @Get('profile')
        getProfile(@Request() req) {
            return req.user;
        }

    }

