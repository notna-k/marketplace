export class UpdateUserDto{
    readonly id: number;
    readonly name: string;
    readonly password: string;
    readonly email: string;
    readonly region: string;
    readonly city : string;
    readonly phoneNumber: string;
    readonly profilePhotos: string[];
    readonly description: string;
    readonly banned: boolean;
    readonly banReason: string;
    readonly rating: number;

}