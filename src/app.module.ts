import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { GalleryModule } from './domains/gallery/gallery.module';
import { EventsModule } from './domains/events/events.module';
import { MemberAreaModule } from './domains/member-area/memberArea.module';
import { PrayerModule } from './domains/prayers/prayer.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/transform-response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      serveRoot: `/${process.env.IMAGES_PATH}`,
      rootPath: join(__dirname, '..', `${process.env.UPLOAD_PATH}`)
    }),
    EventsModule,
    GalleryModule,
    MemberAreaModule,
    PrayerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true
    })
  ],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: TransformResponseInterceptor
  }],
})
export class AppModule { }
