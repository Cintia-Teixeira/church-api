import { Body, Controller, Post } from '@nestjs/common';

import { GalleryService } from './gallery.service';
import { Image } from './../../common/models/image.entity';


@Controller('gallery')
export class GalleryController {
    constructor(private galleryService: GalleryService) { }

    @Post('upload')
    uploadImage(@Body () img: Image) {     
       return this.galleryService.uploadImage(img);    
    }
}

