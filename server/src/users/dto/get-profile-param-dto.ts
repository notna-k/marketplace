import {IsPositive} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";

export class GetProfileParamDto{
    @IsPositive()
    @Transform((value: TransformFnParams) => Number(value.value))
    id: number;
}