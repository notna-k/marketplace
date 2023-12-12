import { AuthUserDto } from "../../shared/dto/auth-user.dto";
export declare class CreateArticleBodyDto extends AuthUserDto {
    title: string;
    description: string;
    price: number;
    currency: string;
}
