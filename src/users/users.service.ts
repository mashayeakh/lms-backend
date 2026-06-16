import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerDto.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }


    async createUser(registerDto: RegisterDto) {

        try {

            return await this.userModel.create({
                fname: registerDto.fname,
                lname: registerDto.lname,
                email: registerDto.email,
                password: registerDto.password
            });
        } catch (error: unknown) {

            console.log("Error creating user: ", error);
            const e = error as { code?: number };
            if (e.code === 11000) {
                throw new ConflictException("Email already exists");
            }

            throw error;
        }

    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email: email });
    }

    async getUserById(id: string) {
        return await this.userModel.findById(id);
    }
}
