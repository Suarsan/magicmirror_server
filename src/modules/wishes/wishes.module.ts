import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';
import { WishesList } from './entities';
import { Author } from '../authors/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WishesList,
      Author
    ])
  ],
  controllers: [WishesController],
  providers: [WishesService]
})
export class WishesModule {}
