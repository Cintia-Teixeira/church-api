import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { config } from 'dotenv';
import * as request from 'supertest';
import { getConnection } from 'typeorm';

import { MemberAreaModule } from './../../../src/domains/member-area/memberArea.module';
import { Directorship, Leadership, Member } from '../../../src/common/models/member.entity';

config();

describe('Member Area', () => {
    let app: INestApplication;
    let connection;
    const member = {
        name: 'Cintia',
        email: 'cin@email.com',
        telphone: '24999999999',
        address: 'Rua do Ouvidor, 50',
        leadership: null,
        directorship: Directorship.SS,
        employee: false,
        deacon: false
    };

    const member2 = {
        name: 'Tais',
        email: 'tais@email.com',
        telphone: '24999999999',
        address: 'Rua do Ouvidor, 50',
        leadership: Leadership.EBD,
        directorship: Directorship.ST,
        employee: true,
        deacon: false
    };

    const memberWithoutName = {
        email: 'cin@email.com',
        telphone: '24999999999',
        address: 'Rua do Ouvidor, 50',
        leadership: null,
        directorship: Directorship.SS,
        employee: false,
        deacon: false
    };

    const memberWithoutEmployeeProp = {
        name: 'Cintia',
        email: 'cin@email.com',
        telphone: '24999999999',
        address: 'Rua do Ouvidor, 50',
        leadership: null,
        directorship: Directorship.SS,
        deacon: false
    };

    const memberWithoutDeaconProp = {
        name: 'Cintia',
        email: 'cin@email.com',
        telphone: '24999999999',
        address: 'Rua do Ouvidor, 50',
        leadership: null,
        directorship: Directorship.SS,
        employee: false
    };

    jest.setTimeout(30000);

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: `.env.${process.env.NODE_ENV}`,
                    isGlobal: true
                }),
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME,
                    entities: [Member],
                    synchronize: true
                }),
                MemberAreaModule
            ]
        })
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();
        connection = getConnection();
        await connection.createQueryRunner().clearTable('members');
        const defaultMember = new Member();
        defaultMember.name = 'Davi';
        defaultMember.email = 'davi@email.com';
        defaultMember.telphone = '21933333333';
        defaultMember.address = 'Porto Velho - RO';
        defaultMember.leadership = Leadership.EBD;
        defaultMember.directorship = Directorship.VM;
        defaultMember.employee = false;
        defaultMember.deacon = true;
        await connection.createQueryBuilder()
            .insert().into(Member).values([defaultMember])
            .execute();

    });

    describe('/GET area-do-membro', () => {
        it('should return a list of all members', async () => {
            return await request(app.getHttpServer())
                .get('/area-do-membro')
                .expect(200);
        });
    });

    describe('/POST area-do-membro', () => {
        it('should create a member', async () => {
            return request(app.getHttpServer())
                .post('/area-do-membro')
                .send(member)
                .expect(201);
        });

        it('should return error if is tried to create a member without name', async () => {
            return request(app.getHttpServer())
                .post('/area-do-membro')
                .send(memberWithoutName)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('name should not be empty');
                });
        });

        it('should return error if is tried to create a member without answering if he/she is an employee', async () => {
            return request(app.getHttpServer())
                .post('/area-do-membro')
                .send(memberWithoutEmployeeProp)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('you have to answer if the member is an employee');
                });
        });

        it('should return error if is tried to create a member without answering if he/she is a deacon', async () => {
            return request(app.getHttpServer())
                .post('/area-do-membro')
                .send(memberWithoutDeaconProp)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('you have to answer if the member is a deacon');
                })
        })
    });

    describe('/PUT area-do-membro/:id', () => {
        it('should update an existing member by its ID', async () => {
            return request(app.getHttpServer())
                .put('/area-do-membro/2')
                .send(member2)
                .expect(200);
        });

        it('should return error if is tried to update a member by an unexisting ID', async () => {
            return request(app.getHttpServer())
                .put('/area-do-membro/35')
                .send(member2)
                .expect(404);
        });

        it('should return error if is tried to update an memberwithout name', async () => {
            return request(app.getHttpServer())
                .put('/area-do-membro/2')
                .send(memberWithoutName)
                .expect(400);
        });

        it('should return error if is tried to update a member without answering if he/she is an employee', async () => {
            return request(app.getHttpServer())
                .put('/area-do-membro/3')
                .send(memberWithoutEmployeeProp)
                .expect(400);
        });

        it('should return error if is tried to update a member without answering if he/she is a deacon', async () => {
            return request(app.getHttpServer())
                .put('/area-do-membro/4')
                .send(memberWithoutDeaconProp)
                .expect(400);
        });
    });

    describe('/DELETE area-do-membro/:id', () => {
        it('should remove a member by its ID', async () => {
            return request(app.getHttpServer())
                .delete('/area-do-membro/1')
                .expect(200);
        });

        it('should return error if is tried to remove a member by an unexisting ID', async () => {
            return request(app.getHttpServer())
                .delete('/area-do-membro/40')
                .expect(404);
        })
    });

    afterAll(async () => {
        await app.close();
    });
})
