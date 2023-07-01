"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const graphql_upload_1 = require("graphql-upload");
const bodyParser = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 10000000 }));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 1000000,
    }));
    app.enableCors({
        origin: "http://127.0.0.1:5501",
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map