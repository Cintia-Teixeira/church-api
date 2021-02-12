import { Test } from '@nestjs/testing';

import { GalleryService } from './../../../src/domains/gallery/gallery.service';
import { GalleryController } from './../../../src/domains/gallery/gallery.controller';
import { GalleryServiceMock } from '../../common/models/galleryServiceMock';
import { Image } from './../../../src/common/models/image.entity';

describe('GalleryController', () => {
    let galleryController: GalleryController;
    let galleryService: GalleryService;
    const img = {
        path: 'test/test-uploads/image2.png'
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

    describe('upload', () => {
        it('should upload a new image with id 2', async () => {
            const result = {
                id: 2,
                ...img
            };

            expect(await galleryController.upload(img)).toStrictEqual(result);
        });

        it('should upload a new image with id 3', async () => {
            const result = {
                id: 3,
                ...img
            };

            expect(await galleryController.upload(img)).toStrictEqual(result);
        });
    });

    describe('findAll', () => {
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
            console.log(result);
            
            expect(await galleryController.findAll()).toStrictEqual(result);
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