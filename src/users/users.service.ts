import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}
   
        findAll(): Promise<User[]> {
            return this.usersRepository.find();
        }

        findOne(id: number): Promise<User | null> {
            return this.usersRepository.findOneBy({ id });
        }

        create(createUserDto: any) {
          return  this.usersRepository.save(createUserDto);
        }

        update(userId: number, UserInformation: Partial<User>): Promise<UpdateResult> {
            return this.usersRepository.update(userId, UserInformation);
        }

        async remove(id: number): Promise<string> {
            try {
                await this.usersRepository.delete(id);
                return 'OK deleted'
            } catch (error) {
                throw error
            }
        }
}
