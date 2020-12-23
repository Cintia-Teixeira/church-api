import { storage } from './storageOptions';
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
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

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.galleryService.remove(id);
    }

}

