import { storage } from './storageOptions';
import { Controller, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GalleryService } from './gallery.service';
import { Image } from './../../common/models/image.entity';


@Controller('gallery')
export class GalleryController {
    constructor(private galleryService: GalleryService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('img', storage))
    uploadImage(@UploadedFile() img): Promise<Image> {
        return this.galleryService.uploadImage(img);
    }

    @Get()
    displayImages(): Promise<Image[]> {
        return this.galleryService.displayImages()
    }

}

