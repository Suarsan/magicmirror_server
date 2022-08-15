import { IsString } from "class-validator";

export class UpdatePasswordDto {
    
    @IsString()
    readonly oldPassword: string;

    @IsString()
    readonly newPassword: string;
}