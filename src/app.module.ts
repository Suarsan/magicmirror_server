import { Module } from '@nestjs/common';
import { WishesModule } from './modules/wishes/wishes.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    WishesModule,
    AuthorsModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
