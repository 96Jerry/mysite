import { HttpException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor() {
    super({
      jwtFromRequest: (req: any) => {
        // console.log(req.headers);
        const cookie = req.headers.cookie;
        try {
          const keyValuePairs = cookie.split("; ");
          let refreshToken: string;

          for (const keyValue of keyValuePairs) {
            const [key, value] = keyValue.split("=");
            if (key === "refreshToken") {
              refreshToken = value;
              break;
            }
          }
          // console.log(refreshToken);
          return refreshToken;
        } catch (e) {
          throw HttpException;
        }
        // const keyValuePairs = cookie.split("; ");
        // let refreshToken: string;

        // for (const keyValue of keyValuePairs) {
        //   const [key, value] = keyValue.split("=");
        //   if (key === "refreshToken") {
        //     refreshToken = value;
        //     break;
        //   }
        // }
        // // console.log(refreshToken);
        // return refreshToken;
      },
      secretOrKey: "myRefreshKey",
    });
  }
  async validate(payload: any) {
    return { userId: payload.userId, userPwd: payload.userPwd };
  }
}
