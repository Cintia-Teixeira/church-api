import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'members'
})
export class Member {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    name: string;

    @Column()
    email: string;

    @Column('varchar', { length: 15 })
    telphone: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    leadership: Leadership;

    @Column({ nullable: true })
    directorship: Directorship;

    @IsNotEmpty({
        message: 'you have to answer if the member is an employee'
    })
    @Column()
    employee: boolean;

    @IsNotEmpty({
        message: 'you have to answer if the member is a deacon'
    })
    @Column()
    deacon: boolean;
}

export enum Leadership {
    DI = "departamento infantil",
    MR = "mensageiras do Rei",
    ER = "embaixadores do Rei",
    JU = "juventude",
    LO = "louvor",
    MCM = "mulher cristã em missão",
    MI = "melhor idade (idosos)",
    UH = "união de homens",
    MU = "multimídia",
    MS = "missões",
    PR = "programações",
    EBD = "ensino"
}

export enum Directorship {
    PR = "presidente",
    VM = "vice moderador(a)",
    PS = "primeiro(a) secretário(a)",
    SS = "segundo(a) secretário(a)",
    PT = "primeiro(a) tesoureiro(a)",
    ST = "segundo(a) tesoureiro(a)"
}

