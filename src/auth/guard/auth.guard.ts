import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext,
    ): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('Token não fornecido.');
        }
        const token = authHeader.replace('Bearer ', '');

        if (!this.validateToken(token)) {
            throw new UnauthorizedException('Token inválido.');
        }

        return true;
    }

    validateToken(token: string): boolean {

        return !!token;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
    }

}