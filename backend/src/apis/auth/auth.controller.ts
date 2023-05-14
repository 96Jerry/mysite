import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { User } from "../user/entities/user.entity";

interface IOAuthUser {
  user: Pick<User, "userId" | "userPwd"> & {
    // accessToken: string;
    // refreshToken: string;
  };
}

@Controller("/")
export class AuthController {
  constructor(
    private readonly authService: AuthService //
  ) {}
  @UseGuards(AuthGuard("naver"))
  @Get("login/naver")
  async loginNaver(
    @Req() req: Request & IOAuthUser,
    @Res() res: Response //
  ) {
    // console.log(req.user);
    await this.authService.loginSocial({ req, res });
    const accessToken = await this.authService.setAccessToken({
      user: req.user,
    });
    const refreshToken = await this.authService.setRefreshToken({
      user: req.user,
    });
    // res.cookie("accessToken", `Bearer ${accessToken}`);
    // res.cookie("refreshToken", refreshToken);
    res.setHeader("set-cookie", [
      `accessToken=Bearer ${accessToken}; samesite=none; secure; path=/;`,
      `refreshToken=${refreshToken}; samesite=none; secure; path=/;`,
    ]);
    res.redirect("http://localhost:5501/frontend/homepage/homepage.html");
  }
}
