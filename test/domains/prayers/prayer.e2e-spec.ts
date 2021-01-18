import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { config } from 'dotenv';
import * as request from 'supertest';

import { PrayerModule } from './../../../src/domains/prayers/prayer.module';
import { Prayer } from './../../../src/common/models/prayer.entity';

config();

describe('Prayers', () => {
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
                    database: process.env.DB_NAME,
                    entities: [Prayer],
                    synchronize: true
                }),
                PrayerModule
            ],
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    describe('/GET oracoes', () => {
        it('should return all the prayer requests', async () => {
            return await request(app.getHttpServer())
                .get('/oracoes')
                .expect(200)
                .expect(res => {
                    console.log(res.body)
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });

})