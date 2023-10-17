 import { NestFactory } from '@nestjs/core';

 import * as process from "process";
 import {AppModule} from "./app.module";
 import sequelize from "sequelize";
 import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
 import * as cookieParser from "cookie-parser";
 import * as cors from "cors"
 import {ValidationPipe} from "@nestjs/common";




const PORT = process.env.PORT || 5000
const docsConfig = new DocumentBuilder()
 .setTitle("RESTful API Documentation for Marketplace")
 .setVersion("0.0.1")
 .addTag("Telegram: @qls06")
 .build();


 async function start() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(cors());

  app.setGlobalPrefix("/api");

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup("/api/docs", app, document);
  await app.listen(PORT, () =>{
      console.log(`SERVER STARTED SUCCESSFULLY ON PORT ${PORT}`);
  });

}

start();
