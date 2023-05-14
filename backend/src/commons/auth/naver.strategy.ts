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

  async validate(accessToken, refreshToken, profile: any, done) {
    // console.log(profile);
    const randomPassword = crypto.randomBytes(16).toString("hex");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);

    const user = { id: profile._json.email.split("@")[0], pwd: hashedPassword };
    // console.log(user);
    return done(null, user);
  }
}
