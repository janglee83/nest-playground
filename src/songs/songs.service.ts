import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';

export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) { }
  private readonly songs = [];

  async create(songDTO: CreateSongDto): Promise<Song> {
    const song = Object.assign(new Song(), songDTO);

    return await this.songRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }
}
