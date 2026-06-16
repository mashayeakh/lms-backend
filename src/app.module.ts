/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
