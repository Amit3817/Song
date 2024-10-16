import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './Song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO, UpdateSongDTO } from './song.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SongService {
  constructor(@InjectRepository(Song) private songRepo: Repository<Song>) {}

  async create(createSongDTO: CreateSongDTO, userId: number): Promise<Song> {
    const song = new Song();
    song.title = createSongDTO.title;
    song.artists = createSongDTO.artists;
    song.duration = createSongDTO.duration;
    song.releaseDate = createSongDTO.releaseDate;
    song.lyrics = createSongDTO.lyrics;
    song.createdBy = userId;

    return await this.songRepo.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songRepo.find();
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.songRepo.findOne({ where: { id } });
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    return song;
  }

  async update(id: string, updateDto: UpdateSongDTO): Promise<UpdateResult> {
    const song = await this.songRepo.findOne({ where: { id } });
    if (song) {
      return await this.songRepo.update(id, updateDto);
    } else {
      throw new NotFoundException('Song not found');
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    const song = await this.songRepo.findOne({ where: { id } });
    if (song) {
      return await this.songRepo.delete(id);
    } else {
      throw new NotFoundException('Song not found');
    }
  }
}
