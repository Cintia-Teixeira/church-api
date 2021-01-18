import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GalleryModule } from './domains/gallery/gallery.module';
import { Image } from './common/models/image.entity';
import { EventsModule } from './domains/events/events.module';
import { MemberAreaModule } from './domains/member-area/memberArea.module';
import { PrayerModule } from './domains/prayers/prayer.module';

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
      entities: [Image],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
