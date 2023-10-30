"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
    static UnauthorizedException(message = "Unauthorized", errors = []) {
        return new ApiError(message, 401, errors);
    }
    static ForbiddenException(message = "Forbidden", errors = []) {
        return new ApiError(message, 403, errors);
    }
    static BadRequestException(message = "Incorrect credentials", errors = []) {
        return new ApiError(message, 400, errors);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=api-errors.js.map