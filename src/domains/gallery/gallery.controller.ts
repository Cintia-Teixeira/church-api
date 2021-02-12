import { Controller, Post, UseInterceptors, UploadedFile, Get, Delete, Param, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GalleryService } from './gallery.service';
import { Image } from 'src/common/models/image.entity';
import { NestResponse } from './../../core/http/nest-response';
import { NestResponseBuilder } from '../../core/http/nest-response-builder';


@Controller('galeria')
export class GalleryController {
    constructor(private galleryService: GalleryService) { }

    @Get()
    listImages(): Promise<Image[]> {
        return this.galleryService.listImages();
    }

    @Post()
    @UseInterceptors(FileInterceptor('img'))
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async uploadImage(@UploadedFile() img): Promise<NestResponse> {
        const uploaded = await this.galleryService.uploadImage(img);
        return new NestResponseBuilder()
            .setStatus(HttpStatus.CREATED)
            .setHeaders({
                'Location': `/galeria/${uploaded.path}`
            })
            .setBody(uploaded)
            .build();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.galleryService.remove(id);
    }
}



