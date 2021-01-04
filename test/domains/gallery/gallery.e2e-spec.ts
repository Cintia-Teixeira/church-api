import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import * as request from 'supertest';
import { config } from 'dotenv';
import { getConnection } from 'typeorm';

import { GalleryModule } from '../../../src/domains/gallery/gallery.module';
import { Image } from '../../../src/common/models/image.entity'

config();

describe('Gallery', () => {
    let app: INestApplication;
    let connection;
    jest.setTimeout(30000);

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: `.env.${process.env.NODE_ENV}`,
                    isGlobal: true
                }),
                GalleryModule,
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME,
                    entities: [Image],
                    synchronize: true
                })
            ]
        })
            .compile();

        app = moduleRef.createNestApplication();
        app.init();
        connection = getConnection();
        await connection.createQueryRunner().clearTable('images');
        const defaultImage = new Image();
        defaultImage.path = 'test/uploads/image.png';
        await connection.createQueryBuilder()
            .insert().into(Image).values([defaultImage])
            .execute();
    });

    describe('/POST gallery', () => {
        it('should upload an image using file upload from nestjs ', async () => {
            return await request(app.getHttpServer())
                .post('/gallery/upload')
                .set('Content-Type', 'multipart/form-data')
                .attach('img', './test/uploads/image.jpg')
                .expect(201);
        });
    });

    describe('/GET gallery', () => {
        it('should display all the images', async () => {
            return await request(app.getHttpServer())
                .get('/gallery')
                .expect(200);
        });
    });

    describe('/DELETE gallery', () => {
        it('should remove an image', async () => {
            return await request(app.getHttpServer())
                .delete('/gallery/2')
                .expect(200);
        });
    });

    afterAll(async () => {
        await app.close();
    });

})