import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDTO, UpdateSongDTO } from './song.dto';
import { Song } from './Song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('song')
@UseGuards(JwtAuthGuard)
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  findAll(): Promise<Song[]> {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne(
    @Param()
    id: string,
  ): Promise<Song> {
    return this.songService.findOne(id);
  }

  @Post()
  create(@Body() song: CreateSongDTO, @Req() request: any): Promise<Song> {
    const userId = request.user.id;
    return this.songService.create(song, userId);
  }

  @Put(':id')
  update(
    @Param()
    id: string,
    @Body() updateDto: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songService.update(id, updateDto);
  }

  @Delete(':id')
  delete(
    @Param()
    id: string,
  ): Promise<DeleteResult> {
    return this.songService.delete(id);
  }
}
