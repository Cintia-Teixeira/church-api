import { INestApplication, ValidationPipe } from '@nestjs/common';
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
    const prayer = {
        label: 'Ore pela igreja',
        prayerRequest: 'God bless local churches'
    }

    const prayer2 = {
        label: 'Ore por missões',
        prayerRequest: 'God bless all the missionaries'
    }

    const prayerWithoutLabel = {
        prayerRequest: 'God bless local churches'
    }

    const prayerWithoutRequest = {
        label: 'Ore pela igreja'
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
                    entities: [Prayer],
                    synchronize: true
                }),
                PrayerModule
            ],
        })
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));

        await app.init();
    });

    describe('/GET oracoes', () => {
        it('should return all the prayer requests', async () => {
            return await request(app.getHttpServer())
                .get('/oracoes')
                .expect(200);
        });
    });

    describe('/POST oracoes', () => {
        it('should create a new prayer request', async () => {
            return await request(app.getHttpServer())
                .post('/oracoes')
                .send(prayer)
                .expect(201);
        });

        it('should return error if is tried to create a prayer request without label', async () => {
            return await request(app.getHttpServer())
                .post('/oracoes')
                .send(prayerWithoutLabel)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('You have to choose a label for your request')
                });
        });

        it('should return error if is tried to create a prayer request without the request', async () => {
            return request(app.getHttpServer())
                .post('/oracoes')
                .send(prayerWithoutRequest)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('You have to write a prayer request')
                });
        });
    });

    describe('/PUT oracoes/:id', () => {
        it('should update an existing prayer request by its ID', async () => {
            return request(app.getHttpServer())
                .put('/oracoes/1')
                .send(prayer2)
                .expect(200);
        });

        it('should return error if is tried to update a prayer request with an unexisting ID', async () => {
            return request(app.getHttpServer())
                .put('/oracoes/40')
                .send(prayer2)
                .expect(404);
        });

        it('should return error if is tried to update a prayer request without a label', async () => {
            return request(app.getHttpServer())
                .put('/oracoes/2')
                .send(prayerWithoutLabel)
                .expect(400);
        });

        it('should return error if is tried to update a prayer request without the request', async () => {
            return request(app.getHttpServer())
                .put('/oracoes/3')
                .send(prayerWithoutRequest)
                .expect(400);
        });
    });

    afterAll(async () => {
        await app.close();
    });

})