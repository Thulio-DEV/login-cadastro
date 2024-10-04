import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { response } from 'express';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            name: "Registro de Usuarios",
            description: "Registro de Usuarios",
            tags: ['node.js', 'nestjs', 'javascript'],
        },
    ];
        findAll() {
            return this.users;
        }

        findOne(id: string) {
            const user = this.users.find((user: User) => user.id === Number(id));

            if(!user) {
                throw new HttpException(`User ID ${id} not found`,
                    HttpStatus.NOT_FOUND,
                );
            }
            return user;
        }

        create(createUserDto: any) {
            this.users.push(createUserDto);
            return createUserDto;
        }

        update(id: string, updateUserDto: any) {
            const indexUser = this.users.findIndex(
                (user: User) => user.id === Number(id),
        );

        this.users[indexUser] = updateUserDto;
        }

        remove(id: string) {
            const indexUser = this.users.findIndex(
                (user: User) => user.id === Number(id),
        );

        if (indexUser >= 0) {
            this.users.splice(indexUser, 1);
        }
    }
}
