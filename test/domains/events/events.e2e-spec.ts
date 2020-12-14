import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as request from 'supertest';

import { EventsService } from './../../../src/domains/events/events.service';
import { EventsController } from './../../../src/domains/events/events.controller';

config();

describe('Events', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
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
          controllers: [EventsController],
          providers: [EventsService]
        })
          .compile();
    
        app = moduleRef.createNestApplication();
        await app.init();
      });

      describe('/GET eventos', () => {
        it('should return a list of all events', async () => {
            return await request(app.getHttpServer())
                .get('/eventos')
                .expect(200);
        });
    });

    afterAll(async () => {
        await app.close();
    });


})