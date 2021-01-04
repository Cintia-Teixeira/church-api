import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { config } from 'dotenv';
import * as request from 'supertest';

import { MemberAreaService } from './../../../src/domains/member-area/memberArea.service';
import { MemberAreaController } from './../../../src/domains/member-area/memberArea.controller';

config();

describe('Member Area', () => {
    let app: INestApplication;

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
                    database: process.env.DB_TEST_NAME,
                    entities: [],
                    synchronize: true
                })
            ],
            controllers: [MemberAreaController],
            providers: [MemberAreaService]
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

    afterAll(async () => {
        await app.close();
    });
})
