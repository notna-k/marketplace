import {IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsPositive, IsString} from "class-validator";
import {CurrencyType} from "../../shared/constants/currency-type";
import {Transform} from "class-transformer";
import {ArticleCategories} from "../../shared/constants/article-categories";

export class CreateArticleBodyDto{
    @IsNotEmpty()
    @IsString()
    title : string;

    @IsString()
    description : string;


    @Transform((value) => {return Number(value.value)})
    @IsPositive()
    @IsOptional()
    price: number;

    @IsEnum(CurrencyType)
    @IsOptional()
    currency: string;

    @IsEnum(ArticleCategories)
    @IsOptional()
    category: ArticleCategories;

}