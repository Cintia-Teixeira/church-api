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
        console.log(img);
        
        const toUpload = {
            id: this.indexToInsert++,
            ...img
        };

        this.images.push(toUpload);
        return toUpload;
    }
}