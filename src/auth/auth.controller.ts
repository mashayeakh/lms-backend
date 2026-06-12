/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/registerDto.dto";

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {
        this.authService = authService;
    }
    @Post("register")
    register(@Body() registerDto: RegisterDto
    ) {

        //logic for registering a user goes here 
        return this.authService.registerUser(registerDto);

    }
}
