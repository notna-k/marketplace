"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const process = require("process");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const docsConfig = new swagger_1.DocumentBuilder()
    .setTitle("RESTful API Documentation for Marketplace")
    .setVersion("0.0.1")
    .addTag("Telegram: @qls06")
    .build();
async function start() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.use(cors());
    app.setGlobalPrefix("/api");
    const document = swagger_1.SwaggerModule.createDocument(app, docsConfig);
    swagger_1.SwaggerModule.setup("/api/docs", app, document);
    await app.listen(PORT, () => {
        console.log(`SERVER STARTED SUCCESSFULLY ON PORT ${PORT}`);
    });
}
start();
//# sourceMappingURL=main.js.map