import { Module } from '@nestjs/common';

import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from './configStorage';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    controllers: [GalleryController],
    providers: [
        GalleryService
    ],
    imports: [
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                storage: storage(configService)
            }),
        })
    ]
})

export class GalleryModule { }