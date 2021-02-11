import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { storage } from './configStorage';

import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';

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