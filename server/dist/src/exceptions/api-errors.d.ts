export declare class ApiError extends Error {
    private statusCode;
    private errors;
    constructor(message: string, statusCode: number, errors: string[]);
    static UnauthorizedException(message?: string, errors?: string[]): ApiError;
    static ForbiddenException(message?: string, errors?: string[]): ApiError;
    static BadRequestException(message?: string, errors?: string[]): ApiError;
}
