import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesList } from '../wishes/entities';
import { WishesModule } from '../wishes/wishes.module';
import { AuthorController } from './author.controller';
import { AuthorsService } from './author.service';
import { Author } from './entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Author,
            WishesList
        ])
    ],
    controllers: [
        AuthorController
    ],
    providers: [
        AuthorsService
    ]
})
export class AuthorsModule {}
