import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsNumber, IsInt } from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true }) 
  readonly artists: string[];

  @IsNotEmpty()
  @IsNumber()  
  readonly duration: number;

  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;

  @IsInt()
  @IsOptional()
  readonly createdBy?: number;
}

export class UpdateSongDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true }) 
  readonly artists: string[];

  @IsOptional()
  @IsNumber()  
  readonly duration: number;

  @IsOptional()
  @IsDateString()
  readonly releaseDate: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
