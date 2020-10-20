import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

import { GalleryService } from './gallery.service';
import { Image } from './../../common/models/image.entity';


@Controller('gallery')
export class GalleryController {
    constructor(private galleryService: GalleryService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor(
        'img',
        {
            storage: diskStorage({
                destination: './test/uploads',
                filename: (req, file, cb) => {
                    const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
                    const extension: string = path.parse(file.originalname).ext;

                    cb(null, `${filename}${extension}`)
                }
            })
        }
    ))
    uploadImage(@UploadedFile() img):Promise<Image> {     
       return this.galleryService.uploadImage(img);    
    }
}

