import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { graphqlUploadExpress } from "graphql-upload";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(graphqlUploadExpress({ maxFileSize: 10000000 }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 1000000,
    })
  );

  app.enableCors({
    origin: "http://localhost:5501",
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
