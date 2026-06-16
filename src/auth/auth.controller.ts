
import { Body, Controller, Get, Post, Request, Res, UseGuards } from "@nestjs/common";
import express from "express";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/registerDto.dto";
import { LoginDto } from "./dto/LoginDto.dto";
import { AuthGuard } from "./auth.guard";
import { UsersService } from "src/users/users.service";

@Controller("auth")
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService

    ) {
        this.authService = authService;
    }


    @Post("register")
    async register(@Body() registerDto: RegisterDto
    ) {
        return await this.authService.registerUser(registerDto);
    }

    @Post("login")
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) res: express.Response
    ) {
        const result = await this.authService.login(loginDto);
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24
        });
        // console.log("resulemt ", result)
        return result;
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    async getProfile(@Request() req) {
        const userId = req?.user.sub
        const user = await this.userService.getUserById(userId as string);
        console.log("user ", user)
        return {
            id: user?.id,
            name: user?.fname + " " + user?.lname,
            role: user?.role,
            email: user?.email

        };

    }
}
