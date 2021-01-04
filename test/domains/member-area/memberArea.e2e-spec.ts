import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { config } from 'dotenv';
import * as request from 'supertest';

import { MemberAreaModule } from './../../../src/domains/member-area/memberArea.module';
import { Directorship, Member } from '../../../src/common/models/member.entity';

config();

describe('Member Area', () => {
    let app: INestApplication;
    let member = {
        name: 'Cintia',
        email: 'cin@email.com',
        telphone: 24999999999,
        address: 'Rua do Ouvidor, 50',
        leadership: null,
        directorship: Directorship.SS,
        employee: false,
        deacon: false
    }

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
        })
    })

    afterAll(async () => {
        await app.close();
    });
})
