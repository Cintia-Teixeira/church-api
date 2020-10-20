import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'images'
})
export class Image {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;
} 