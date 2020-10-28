import { Image } from '../../../src/common/models/image.entity';

export class GalleryServiceMock {
    private images = [
        {
            id: 1,
            path: 'test/uploads/image.png'
        }
    ];
    private indexToInsert = 2;

    constructor() { }

    uploadImage(img) {
        const toUpload = {
            id: this.indexToInsert++,
            ...img
        };

        this.images.push(toUpload);
        return toUpload;
    }

    displayImages(): Image[] {
        console.log(this.images);
        
        return this.images
    }
}