import { Module } from "@nestjs/common";

import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BoardModule } from "./apis/board/board.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: process.env.MYSQL_PASSWORD,
      database: "mysite",
      entities: [__dirname + "/apis/**/*.entity.*"],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/commons/schema.gql",
    }),
  ],
  // controllers: [AppController],
})
export class AppModule {}
