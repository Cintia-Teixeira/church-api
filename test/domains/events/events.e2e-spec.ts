import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as request from 'supertest';

import { EventsModule } from './../../../src/domains/events/events.module';
import { Event } from './../../../src/common/models/event.entity';

config();

describe('Events', () => {
    let app: INestApplication;
    let event = {
        date: new Date('2021-01-13 08:00:00'),
        name: 'III Jornada Teológica',
        description: 'Jornada'
    }

    let event2 = {
        date: new Date('2021-05-10 11:00:00'),
        name: 'IV Jornada Teológica',
        description: 'Jornada'
    }

    let eventWithoutDate = {
        name: 'IV Jornada Teológica',
        description: 'Jornada Teológica'
    }

    let eventWithoutName = {
        date: new Date('2021-10-12 9:00:00'),
        description: 'Jornada'
    }

    let eventWithoutDescription = {
        date: new Date('2021-07-04 12:00:00'),
        name: 'IV Jornada Teológica'
    }

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
        app.useGlobalPipes(new ValidationPipe({ transform: true }));

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

    describe('/POST eventos', () => {
        it('should create a new event', async () => {
            await request(app.getHttpServer())
                .post('/eventos')
                .send(event)
                .expect(201)
                .expect(res => {
                    console.log(res.body);
                });
        });

        it('should return error if is tried to create an event without a date', async () => {
            return await request(app.getHttpServer())
                .post('/eventos')
                .send(eventWithoutDate)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('date should not be empty');
                });
        });

        it('should return error if is tried to create an event without a name', async () => {
            return await request(app.getHttpServer())
                .post('/eventos')
                .send(eventWithoutName)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('name should not be empty');
                });
        });

        it('should return error if is tried to create an event without a description', async () => {
            return await request(app.getHttpServer())
                .post('/eventos')
                .send(eventWithoutDescription)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('description should not be empty');
                });
        });
    });

    describe('/PUT eventos', () => {
        it('should update an existing event by its ID', async () => {
            await request(app.getHttpServer())
                .put('/eventos/1')
                .send(event2)
                .expect(200);
        });

        it('should return error if is tried to update an existing event without a date', async () => {
            return await request(app.getHttpServer())
                .put('/eventos/5')
                .send(eventWithoutDate)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('date should not be empty');
                });
        });

        it('should return error if is tried to update an existing event without a name', async () => {
            return await request(app.getHttpServer())
                .put('/eventos/6')
                .send(eventWithoutName)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('name should not be empty');
                });
        });

        it('should return error if is tried to update an existing event without a description', async () => {
            return await request(app.getHttpServer())
                .put('/eventos/7')
                .send(eventWithoutDescription)
                .expect(400)
                .expect(res => {
                    expect(res.body.message).toContain('description should not be empty');
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });


})