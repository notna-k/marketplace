import {IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsPositive, IsString} from "class-validator";
import {CurrencyType} from "../../shared/constants/currency-type";
import {Transform} from "class-transformer";

export class CreateArticleBodyDto{
    @IsNotEmpty()
    @IsString()
    title : string;

    @IsString()
    description : string;

    @IsNotEmpty()
    @Transform((value) => {return Number(value.value)})
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsEnum(CurrencyType)
    currency: string;
}