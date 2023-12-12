import {IsNotEmpty, IsNumber} from "class-validator";

export class GetArticleParamDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}