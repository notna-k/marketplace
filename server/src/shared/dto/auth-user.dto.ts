import {IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString} from "class-validator";

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
    @IsOptional()
    @IsObject()
    user: UserJwtPayload
}