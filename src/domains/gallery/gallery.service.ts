import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

import { Image } from './../../common/models/image.entity';

@Injectable()
export class GalleryService {
    private imageRepository: Repository<Image>;

    constructor(connection: Connection) {
        this.imageRepository = connection.getRepository(Image);
    }

    listImages(): Promise<Image[]> {
        return this.imageRepository.find();
    }

    async uploadImage(img): Promise<Image> {
        const { raw: { insertId } } = await this.imageRepository.insert({ path: img.virtualPath });

        return {
            id: insertId,
            ...img
        };
    }

    async remove(id: number) {
        const deleted = await this.imageRepository.delete({ id });
        return deleted.affected;
    }

}
