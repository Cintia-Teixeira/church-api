import { Controller, Post, UseInterceptors, UploadedFile, Get, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GalleryService } from './gallery.service';
import { Image } from 'src/common/models/image.entity';


@Controller('gallery')
export class GalleryController {
    constructor(private galleryService: GalleryService) { }

    @Get()
    listImages(): Promise<Image[]> {
        return this.galleryService.listImages();
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('img'))
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    uploadImage(@UploadedFile() img): Promise<Image> {
        return this.galleryService.uploadImage(img);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.galleryService.remove(id);
    }
}



