export class ApiError extends Error{
    private statusCode: number;
    private errors: string[];
    constructor(message:string, statusCode: number, errors: string[]) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }

    static UnauthorizedException(message = "Unauthorized" ,errors:string[] = []){
        return new ApiError(message, 401, errors);
    }

    static ForbiddenException(message = "Forbidden" ,errors:string[] = []){
        return new ApiError(message, 403, errors);
    }

    static BadRequestException(message = "Incorrect credentials" ,errors:string[] = []){
        return new ApiError(message, 400, errors);
    }
}