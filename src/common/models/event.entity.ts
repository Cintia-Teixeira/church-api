import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'events'
})
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    name: string;

    @Column()
    description: string;
}