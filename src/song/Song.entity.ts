import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;  

  @Column()
  title: string;

  @Column('simple-array')  
  artists: string[];

  @Column({ type: 'int' })  
  duration: number;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'text', nullable: true })  
  lyrics: string;

  @Column({ nullable: true }) 
  createdBy: number;
}
