import {IsNotEmpty, IsString, MinLength} from "class-validator";


export class SignUpBodyDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}