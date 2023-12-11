import {IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString} from "class-validator";

export class UserJwtPayload{
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsBoolean()
    isActivated: boolean;
}

export class AuthUserDto{
    @IsObject()
    @IsNotEmpty()
    user: UserJwtPayload
}