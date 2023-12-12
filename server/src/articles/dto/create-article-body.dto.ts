import {IsEnum, IsNotEmpty, IsNumberString, IsString} from "class-validator";
import {CurrencyType} from "../../shared/constants/currency-type";
import {AuthUserDto} from "../../shared/dto/auth-user.dto";

export class CreateArticleBodyDto extends AuthUserDto{
    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    description : string;

    @IsNumberString()
    price: number;

    @IsEnum(CurrencyType)
    currency: string;
}