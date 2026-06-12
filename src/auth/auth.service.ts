import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/registerDto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {
        this.usersService = usersService;
    }
    async registerUser(registerDto: RegisterDto) {


        //hasing
        const saltRounds = 10;
        const hashing = await bcrypt.hash(registerDto.password, saltRounds);

        //logic for registering a user goes here

        /**
         *  check if email already exists in the database
         *  hash the password using bcrypt
         *  store the user in the database
         *  generate a JWT token for the user
         *  send token in response
         */
        // return "User registered successfully";
        console.log(registerDto);
        return this.usersService.createUser({
            ...registerDto,
            password: hashing
        });
    }
}
