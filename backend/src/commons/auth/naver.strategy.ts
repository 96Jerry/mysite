import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver";
import "dotenv/config";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";

export class NaverStrategy extends PassportStrategy(Strategy, "naver") {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/naver",
      scope: ["profile", "email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) {
    // console.log(profile);
    const randomPassword = crypto.randomBytes(16).toString("hex");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);

    const user = {
      userId: profile._json.email.split("@")[0],
      userPwd: hashedPassword,
      // accessToken,
      // refreshToken,
    };
    // console.log(user.accessToken);
    return done(null, user);
  }
}
