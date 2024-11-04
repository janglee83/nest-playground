import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist, Song, User } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
