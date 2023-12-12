import {IsNumberString, IsOptional, IsPositive, IsString} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";

export class GetAllArticlesQueryDto{
    @IsOptional()
    @IsNumberString()
    @Transform((value: TransformFnParams) => Number(value.value))
    @IsPositive()
    count: number;

    @IsOptional()
    @IsNumberString()
    @Transform((value: TransformFnParams) => Number(value.value))
    @IsPositive()
    offset: number;

    @IsOptional()
    @IsString()
    title: string;
}