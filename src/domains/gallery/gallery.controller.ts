import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
    constructor(private galleryService: GalleryService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('img'))
    uploadImage(@UploadedFile() img) {
        return this.galleryService.uploadImage(img);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.galleryService.remove(id);
    }

}

