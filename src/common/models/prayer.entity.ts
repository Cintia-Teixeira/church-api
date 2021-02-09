import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'prayers'
})
export class Prayer {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({
        message: 'You have to choose a label for your request'
    })
    @Column()
    label: Purpose;

    @IsNotEmpty({
        message: 'You have to write a prayer request'
    })
    @Column()
    prayerRequest: string;
}

export enum Purpose {
    IG = "igreja",
    FM = "família",
    MS = "missões"
}