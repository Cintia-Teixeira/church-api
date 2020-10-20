describe('GalleryController', () => {
    let img = {
        path: 'test/uploads/image2.png'
    };

    describe('uploadImage', () => {
        it('should upload a new image with id 2', async () => {
            const result = {
                id: 2,
                ...img
            };

            expect(await galleryController.uploadImage(img)).toStrictEqual(result);
        });
    });
})