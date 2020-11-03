import { Test } from '@nestjs/testing';
import { GalleryService } from './../../../src/domains/gallery/gallery.service';
import { GalleryController } from './../../../src/domains/gallery/gallery.controller';
import { GalleryServiceMock } from '../../common/models/galleryServiceMock';
import { Image } from './../../../src/common/models/image.entity';

describe('GalleryController', () => {
    let galleryController: GalleryController;
    let galleryService: GalleryService;
    let img = {
        path: 'test/uploads/image2.png'
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [GalleryController],
            providers: [GalleryService]
        })
            .overrideProvider(GalleryService)
            .useClass(GalleryServiceMock)
            .compile();

        galleryController = moduleRef.get<GalleryController>(GalleryController);
        galleryService = moduleRef.get<GalleryService>(GalleryService);
    });

    describe('uploadImage', () => {
        it('should upload a new image with id 2', async () => {
            const result = {
                id: 2,
                ...img
            };

            expect(await galleryController.uploadImage(img)).toStrictEqual(result);
        });

        it('should upload a new image with id 3', async () => {
            const result = {
                id: 3,
                ...img
            };

            expect(await galleryController.uploadImage(img)).toStrictEqual(result);
        });
    });

    describe('displayImages', () => {
        it('should display all images', async () => {
            const result: Image[] = [
                {
                    id: 1,
                    path: 'test/uploads/image.png'
                },
                {
                    id: 2,
                    ...img
                },
                {
                    id: 3,
                    ...img
                }
            ];

            expect(await galleryController.displayImages()).toStrictEqual(result);
        });
    });

    describe('remove', () => {
        it('should remove an image by ID', async () => {
          const id = 3;
          let result: void
    
          expect(await galleryController.remove(id)).toBe(result);
        });
      });
    
})