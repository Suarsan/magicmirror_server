import { IsString } from "class-validator";

export class CreateAuthorDto {

    @IsString()
    readonly email: string;
    
    @IsString()
    readonly password: string;
    
}