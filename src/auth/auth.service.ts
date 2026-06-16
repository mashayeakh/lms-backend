import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/registerDto.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
        this.usersService = usersService;
    }


    async registerUser(registerDto: RegisterDto) {


        //hasing
        const saltRounds = 10;
        const hashing = await bcrypt.hash(registerDto.password, saltRounds);

        //logic for registering a user goes here

        /**
         *  1 check if email already exists in the database
         *  1 hash the password using bcrypt
         *  1 store the user in the database
         *  generate a JWT token for the user
         *  send token in response
         */
        // return "User registered successfully";
        console.log(registerDto);
        const user = await this.usersService.createUser({
            ...registerDto,
            password: hashing
        });
        console.log("user created: ", user);
        const payload = { sub: user._id };


        const token = await this.jwtService.signAsync(payload)
        console.log("token generated: ", token);

        return {
            token: token,
        };
    }

    async login(loginDto: {
        email: string;
        password: string;
    }) {


        //fetch the user
        const user = await this.usersService.findByEmail(loginDto.email);
        console.log("user founddd: ", user);


        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }


        //dycript the password and compare with the hashed password in the database


        const isMatch = await bcrypt.compare(loginDto.password, user?.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        //now generate a JWT token for the user

        //TODO  -> for tsing we set admin
        const payload = { sub: user?._id, role: 'admin' };

        console.log("payload: ", payload);
        const token = await this.jwtService.signAsync(payload)
        console.log("token generated: ", token);
        return {
            message: "Login successful",
            name: user?.fname,
            email: user?.email,
            token: token,
        }
    }
}