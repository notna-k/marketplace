import {IsEnum, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";
import {ArticleCategories} from "../../shared/constants/article-categories";

export class GetAllArticlesQueryDto{
    @IsOptional()
    @IsPositive()
    @Transform((value: TransformFnParams) => Number(value.value))
    count: number;

    @IsOptional()
    @IsNumber()
    @Transform((value: TransformFnParams) => Number(value.value))
    offset: number;

    @IsOptional()
    @IsString()
    title: string;

    @IsEnum(ArticleCategories)
    @IsOptional()
    category: ArticleCategories;
}