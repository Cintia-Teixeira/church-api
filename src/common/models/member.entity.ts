import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'members'
})
export class Member {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    telphone: number;

    @Column()
    address: string;

    @Column()
    leadership: Leadership;

    @Column()
    directorship: Directorship;

    @Column()
    employee: boolean;

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

