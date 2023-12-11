 import { NestFactory } from '@nestjs/core';
 import * as process from "process";
 import {AppModule} from "./app.module";
 import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
 import * as cookieParser from "cookie-parser";
 import {BadRequestException, ValidationPipe} from "@nestjs/common";
 import {ConfigService} from "@nestjs/config";



 const PORT = process.env.PORT;
const docsConfig = new DocumentBuilder()
 .setTitle("RESTful API Documentation for Marketplace")
 .setVersion("0.0.1")
 .addTag("Telegram: @qls06")
 .build();


 async function start() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)

  app.enableCors({
   origin: [config.get('CLIENT_URL'), 'http://localhost:3000'],
   credentials: true,
  })

  app.use(cookieParser())

  app.useGlobalPipes(
      new ValidationPipe({
       whitelist: true,
       transform: true,
       exceptionFactory: errors =>
           new BadRequestException(errors, 'Validation Error'),
      }),
  )

  app.setGlobalPrefix("/api");


  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup("/api/docs", app, document);
  await app.listen(PORT, () =>{
      console.log(`SERVER STARTED SUCCESSFULLY ON PORT ${PORT}`);
  });

}

start();
