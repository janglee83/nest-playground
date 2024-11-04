import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist, Song } from 'src/entities';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
