import {IsNotEmpty, IsPositive} from "class-validator";
import {Transform} from "class-transformer";

export class GetUserArticlesParamDto{
    @IsNotEmpty()
    @Transform((value) => {return Number(value.value)})
    id: number;
}