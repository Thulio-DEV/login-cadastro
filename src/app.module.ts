import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
     type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'cursoTESTE',
      entities: [User],
      synchronize: true,
  }), AuthModule, 
  ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
