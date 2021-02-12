import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

import { Image } from './../../common/models/image.entity';

@Injectable()
export class GalleryService {
    private imageRepository: Repository<Image>;

    constructor(connection: Connection) {
        this.imageRepository = connection.getRepository(Image);
    }

    public findAll(): Promise<Image[]> {
        return this.imageRepository.find();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async upload(img): Promise<Image> {
        const { raw: { insertId } } = await this.imageRepository.insert({ path: img.virtualPath });
        
        return {
            id: insertId,
            path: img.virtualPath
        };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async remove(id: number) {
        const deleted = await this.imageRepository.delete({ id });
        return deleted.affected;
    }

}
