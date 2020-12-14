import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as request from 'supertest';

import { EventsModule } from './../../../src/domains/events/events.module';
import { Event } from './../../../src/common/models/event.entity';

config();

describe('Events', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                EventsModule,
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_TEST_NAME,
                    entities: [Event],
                    synchronize: true
                })
            ]
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    describe('/GET eventos', () => {
        it('should return a list of all events', async () => {
            return await request(app.getHttpServer())
                .get('/eventos')
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