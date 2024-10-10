import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "../constants";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (private jwtService: JwtService){}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("CHEGUEI NESSA PORRA")
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if(!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            console.log('Payload:', payload);
            return true;
        }
        catch (error) {
            console.error('JWT verification failed:', error.message);
            throw new UnauthorizedException('Invalid token');
        }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}