import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from "process";

@Injectable()
export class AuthMailService{
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }

        } as nodemailer.TransportOptions)
    }
    async sendActivationEmail(to, link){
        await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: "Activation of account on" + process.env.SERVER_URL,
            html:
            `
                <div>
                    <a href="${link}">Click the reference to activate the account</a>
                </div>
            `
        })

    }
}