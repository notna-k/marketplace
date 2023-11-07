export class CreateArticleDto{
    readonly head : string;
    readonly description : string;
    readonly price: number;
    readonly currency: string;
    readonly pictures: Express.Multer.File[];
}