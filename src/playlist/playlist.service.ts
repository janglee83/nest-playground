import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist, Song, User } from 'src/entities';
import { In, Repository } from 'typeorm';
import { CreatePlayListDto } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist) private playListRepo: Repository<Playlist>,
    @InjectRepository(Song) private songRepo: Repository<Song>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  async create(playListDto: CreatePlayListDto): Promise<Playlist> {
    const { name, songs, user } = playListDto;
    const playList = new Playlist();
    playList.name = name;
    playList.songs = await this.songRepo.findBy({ id: In(songs) });
    playList.user = await this.userRepo.findOneBy({ id: user });

    return this.playListRepo.save(playList);
  }
}
