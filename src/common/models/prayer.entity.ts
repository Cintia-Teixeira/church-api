import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'prayers'
})
export class Prayer {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    label: Purpose;

    @IsNotEmpty()
    @Column()
    prayerRequest: string;
}

export enum Purpose {
    IG = "igreja",
    FM = "família",
    MS = "missões"
}