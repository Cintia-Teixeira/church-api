import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

import { Image } from './../../common/models/image.entity';

@Injectable()
export class GalleryService {
    private imageRepository: Repository<Image>;

    constructor(connection: Connection) {
        this.imageRepository = connection.getRepository(Image);
    }

    async uploadImage(img): Promise<Image> {
        const { raw: { insertId } } = await this.imageRepository.insert(img);
        console.log(img.originalname);
        
        return {
            id: insertId,
            ...img
        }
    }

    displayImages (): Promise<Image[]> {
        return this.imageRepository.find();
    }

    async remove(id: number) {
        const deleted = await this.imageRepository.delete({ id });
        return deleted.affected;
      }
    
}
