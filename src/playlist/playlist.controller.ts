import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDto } from './dto/create-playlist-dto';
import { Playlist } from 'src/entities';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @Post()
  create(@Body() playlistDto: CreatePlayListDto): Promise<Playlist> {
    return this.playlistService.create(playlistDto);
  }
}
