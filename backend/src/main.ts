import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "https://96jerry.github.io/mysite/",
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
