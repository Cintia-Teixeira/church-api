import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as request from 'supertest';
import { config } from 'dotenv';

import { GalleryModule } from '../../../src/domains/gallery/gallery.module';
import { Image } from '../../../src/common/models/image.entity'

config();

describe('Gallery', () => {
    let app: INestApplication;
    let img = {
        id: 1,
        path: 'test/uploads/image.png'
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                GalleryModule,
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_TEST_NAME,
                    entities: [Image],
                    synchronize: true
                })
            ]
        })
            .compile();

        app = moduleRef.createNestApplication();
        app.init();
    });

    describe('/POST gallery', () => {
        it('should upload a photo', async () => {
            return await request(app.getHttpServer())
                .post('/gallery/upload')
                .send(img)
                .expect(201);
        });
        console.log('test');
    });

    afterAll(async () => {
        await app.close();
    });

})