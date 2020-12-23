import { Controller, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
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
    uploadImage(@UploadedFile() img) {
        return this.galleryService.uploadImage(img);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.galleryService.remove(id);
    }

}

