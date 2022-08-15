import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateWisheslistDto, UpdateWisheslistDto } from './dtos';
import { WishesService } from './wishes.service';
import { WishesList } from './entities/wisheslist.entity';

@Controller('wishes')
export class WishesController {

    constructor(private readonly wishesService: WishesService) {}

    @Get()
    async getWishesLists(): Promise<WishesList[]> {
        return await this.wishesService.getWishesLists();
    }
    
    @Get(':id')
    async getWishesList(@Param('id') id: number): Promise<WishesList> {
        return await this.wishesService.getWishesList(id);
    }
    
    @Post()
    async createWishesList(@Body() dto: CreateWisheslistDto): Promise<WishesList> {
        return await this.wishesService.createWishesList(dto.name, dto.author_id);
    }

    @Patch(':id')
    async updateWishesList(@Param('id') id: number, @Body() dto: UpdateWisheslistDto) {
        return await this.wishesService.updateWishesList(id, dto.name);
    }
    
    @Delete(':id')
    async deleteWishesList(@Param('id') id: number) {
        return await this.wishesService.deleteWishesList(id);
    }
}
