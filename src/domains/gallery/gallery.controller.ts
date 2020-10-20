import { GalleryService } from './gallery.service';
import { Body, Controller, Post } from '@nestjs/common';


@Controller('gallery')
export class GalleryController {
    constructor(private galleryService: GalleryService) { }

    uploadImage(img) {     
       return this.galleryService.uploadImage(img);    
    }
}

