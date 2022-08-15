import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { WishesList } from "../wishes/entities";
import { AuthorsService } from "./author.service";
import { CreateAuthorDto, UpdatePasswordDto } from "./dtos";
import { Author } from "./entities";

@Controller('author')
export class AuthorController {

    constructor(private readonly authorService: AuthorsService) {}

    @Get()
    async getAuthors(): Promise<Array<Author>> {
        return await this.authorService.getAuthors();
    }

    @Get(':id')
    async getAuthor(@Param('id') id: number): Promise<Author> {
        return await this.authorService.getAuthor(id);
    }

    @Get(':id/wishes')
    async getAuthorWishes(@Param('id') id: number): Promise<Array<WishesList>> {
        return await this.authorService.getAuthorWishes(id);
    }

    @Post()
    async createAuthor(@Body() dto: CreateAuthorDto): Promise<Author> {
        return await this.authorService.createAuthor(dto.email, dto.password);
    }

    @Patch(':id')
    async updatePassword(@Param('id') id: number, @Body() dto: UpdatePasswordDto) {
        return await this.authorService.updatePassword(id, dto.oldPassword, dto.newPassword);
    }
    @Delete(':id')
    async deleteAuthor(@Param('id') id: number) {
        return await this.authorService.deleteAuthor(id);
    }
}