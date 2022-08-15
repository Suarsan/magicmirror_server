import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../authors/entities';
import { WishesList } from './entities';

@Injectable()
export class WishesService {

    constructor(@InjectRepository(WishesList) private readonly wisheslistRepository: Repository<WishesList>) { }

    async getWishesLists(): Promise<WishesList[]> {
        const wlList = await this.wisheslistRepository.find({
            relations: ['author']
        });

        return wlList;
    }

    async getWishesList(id: number): Promise<WishesList> {
        const wl: WishesList = await this.wisheslistRepository.findOne({
            where: { id }
        });
        
        if (!wl) {
            throw new NotFoundException('Resource not found');
        }

        return wl;
    }

    async createWishesList(name: string, author_id: number): Promise<WishesList> {
        const wl: WishesList = await this.wisheslistRepository.create({
            name,
            author_id
        });

        const savedWl = this.wisheslistRepository.save(wl);

        if (!savedWl) {
            throw new NotFoundException('Resource not found');
        }

        return savedWl;
    }
    
    async updateWishesList(id: number, name: string): Promise<WishesList> {
        const wl: WishesList = await this.wisheslistRepository.preload({
            id,
            name
        });

        if (!wl) {
            throw new NotFoundException('Resource not found');
        }

        return wl;
    }

    async deleteWishesList(id: number) {
        const wl: WishesList = await this.wisheslistRepository.findOne({
            where: { id }
        });

        if (!wl) {
            throw new NotFoundException('Resource not found')
        }

        await this.wisheslistRepository.remove(wl);

        return wl;
    }
}
