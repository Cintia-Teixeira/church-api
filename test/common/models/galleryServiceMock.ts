/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Image } from '../../../src/common/models/image.entity';

export class GalleryServiceMock {
    private images = [
        {
            id: 1,
            path: 'test/uploads/image.png'
        }
    ];
    private indexToInsert = 2;

    uploadImage(img) {
        const toUpload = {
            id: this.indexToInsert++,
            ...img
        };

        this.images.push(toUpload);
        return toUpload;
    }

    listImages(): Image[] {
        return this.images
    }

    remove(id: number) {
        const filtered = this.images.filter(image => image.id != id);
        this.images = filtered;
    }

}