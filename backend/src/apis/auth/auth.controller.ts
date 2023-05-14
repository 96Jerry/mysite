import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("/")
export class AuthController {
  constructor(
    private readonly authService: AuthService //
  ) {}
  @UseGuards(AuthGuard("naver"))
  @Get("login/naver")
  async loginNaver(
    @Req() req: Request,
    @Res() res: Response //
  ) {
    // console.log(req.user);
    await this.authService.loginSocial({ req, res });
  }
}
