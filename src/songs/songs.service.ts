import { InjectRepository } from '@nestjs/typeorm';
import { Artist, Song } from 'src/entities';
import { In, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) { }
  private readonly songs = [];

  async create(songDTO: CreateSongDto): Promise<Song> {
    const song = Object.assign(new Song(), songDTO);
    song.artists = await this.artistRepository.findBy({
      id: In(songDTO.artists),
    });

    return await this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }

  async update(
    id: number,
    recordToUpdate: UpdateSongDto,
  ): Promise<UpdateResult> {
    const artists = await this.artistRepository.findBy({
      id: In(recordToUpdate.artists),
    });

    const dataToUpdate: Partial<Song> = {
      ...recordToUpdate,
      artists: artists,
    };
    return this.songRepository.update(id, dataToUpdate);
  }

  async paginate(option: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, option);
  }
}
