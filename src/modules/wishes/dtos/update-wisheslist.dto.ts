import { IsString } from "class-validator";

export class UpdateWisheslistDto {
    
    @IsString()
    readonly name: string;
    
    @IsString()
    readonly author: string;
}
