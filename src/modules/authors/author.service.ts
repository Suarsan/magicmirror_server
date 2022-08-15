import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishesList } from '../wishes/entities';
import { Author } from './entities';

@Injectable()
export class AuthorsService {

    constructor(@InjectRepository(Author) private readonly authorRepository: Repository<Author>,
                @InjectRepository(WishesList) private readonly wisheslistRepository: Repository<WishesList>) { }

    async getAuthors(): Promise<Author[]> {
        const authors = await this.authorRepository.find();

        return authors;
    }

    async getAuthor(id: number): Promise<Author> {
        const author: Author = await this.authorRepository.findOne({
            where: { id }
        });
        
        if (!author) {
            throw new NotFoundException('Resource not found');
        }

        return author;
    }
    
    async getAuthorWishes(id: number): Promise<Array<WishesList>> {
        const authorWishes: Array<WishesList> = await this.wisheslistRepository.find({
            where: { author_id: id }
        });
        
        if (!authorWishes) {
            throw new NotFoundException('Resource not found');
        }

        return authorWishes;
    }

    async createAuthor(email: string, password: string): Promise<Author> {
        const author: Author = await this.authorRepository.create({
            email,
            password
        });

        const savedAuthor = this.authorRepository.save(author);

        if (!savedAuthor) {
            throw new NotFoundException('Resource not found');
        }

        return savedAuthor;
    }
    
    async updatePassword(id: number, oldPassword: string, newPassword: string): Promise<Author> {
        if ((await this.authorRepository.findOne({where: { id }})).password !== oldPassword) {
            throw new ForbiddenException('Authorization denied');
        }

        const author: Author = await this.authorRepository.preload({
            id,
            password: newPassword
        });

        const savedAuthor = this.authorRepository.save(author);

        if (!savedAuthor) {
            throw new NotFoundException('Resource not found');
        }

        return savedAuthor;
    }

    async deleteAuthor(id: number) {
        const author: Author = await this.authorRepository.findOne({
            where: { id }
        });

        if (!author) {
            throw new NotFoundException('Resource not found')
        }

        await this.authorRepository.remove(author);

        return author;
    }
}
