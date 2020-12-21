import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'events'
})
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    date: Date;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    description: string;
}