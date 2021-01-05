import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { config } from 'dotenv';
import * as request from 'supertest';

import { MemberAreaModule } from './../../../src/domains/member-area/memberArea.module';
import { Directorship, Leadership, Member } from '../../../src/common/models/member.entity';

config();

describe('Member Area', () => {
    let app: INestApplication;
    let member = {
        name: 'Cintia',
        email: 'cin@email.com',
        telphone: '24999999999',
        address: 'Rua do Ouvidor, 50',
        leadership: null,
        directorship: Directorship.SS,
        employee: false,
        deacon: false
    };

    let member2 = {
        name: 'Tais', 
        email: 'tais@email.com',
        telphone: '24999999999', 
        address: 'Rua do Ouvidor, 50',
        leadership: Leadership.EBD,
        directorship: Directorship.ST,
        employee: true,
        deacon: false
    };

    let memberWithoutName = {
        email: 'cin@email.com',
        telphone: '24999999999',
        address: 'Rua do Ouvidor, 50',
        leadership: null,
        directorship: Directorship.SS,
        employee: false,
        deacon: false
    };

    let memberWithoutEmployeeProp = {
        name: 'Cintia',
        email: 'cin@email.com',
        telphone: '24999999999',
        address: 'Rua do Ouvidor, 50',
        leadership: null,
        directorship: Directorship.SS,
        deacon: false
    };

    let memberWithoutDeaconProp = {
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
    });

    describe('/GET area-do-membro', () => {
        it('should return a list of all members', async () => {
            return await request(app.getHttpServer())
                .get('/area-do-membro')
                .expect(200)
                .expect(res => {
                    console.log(res.body);
                });
        });
    });

    describe('/POST area-do-membro', () => {
        it('should create a member', async () => {
            return request(app.getHttpServer())
                .post('/area-do-membro')
                .send(member)
                .expect(201)
                .expect(res => {
                    console.log(res.body);
                });
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
                expect (res.body.message).toContain('you have to answer if the member is an employee');
            });
        });

        it('should return error if is tried to create a member without answering if he/she is a deacon', async () => {
            return request(app.getHttpServer())
            .post('/area-do-membro')
            .send(memberWithoutDeaconProp)
            .expect(400)
            .expect(res => {
                expect (res.body.message).toContain('you have to answer if the member is a deacon');
            })
        })
    });

    describe('/PUT area-do-membro/:id', () => {
        it('should update an existing member by its ID', async () => {
            return request(app.getHttpServer())
            .put('area-do-membro/1')
            .send(member2)
            .expect(200);
        });
    });

    afterAll(async () => {
        await app.close();
    });
})
