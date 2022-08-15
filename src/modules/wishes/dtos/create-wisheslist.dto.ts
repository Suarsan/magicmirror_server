import { IsNumber, IsObject, IsString } from "class-validator";

export class CreateWisheslistDto {
    
    @IsString()
    readonly name: string;
    
    @IsNumber()
    readonly author_id: number;
}
