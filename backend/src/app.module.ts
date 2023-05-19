import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BoardModule } from "./apis/board/board.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { UserModule } from "./apis/user/user.module";
import { AuthModule } from "./apis/auth/auth.module";
import { ViewModule } from "./apis/view/view.module";

dotenv.config();

@Module({
  imports: [
    ViewModule,
    AuthModule,
    UserModule,
    BoardModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      // host: "my-database",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: process.env.MYSQL_PASSWORD,
      // database: "mydocker",
      database: "mysite",
      entities: [__dirname + "/apis/**/*.entity.*"],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/commons/graphql/schema.gql",
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  // controllers: [AppController],
})
export class AppModule {}
