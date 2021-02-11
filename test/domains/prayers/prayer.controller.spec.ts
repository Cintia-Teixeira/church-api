import { Test } from '@nestjs/testing';

import { PrayerController } from '../../../src/domains/prayers/prayer.controller';
import { PrayerService } from '../../../src/domains/prayers/prayer.service';
import { PrayerServiceMock } from '../../common/models/prayerServiceMock';
import { Prayer } from 'src/common/models/prayer.entity';

describe('PrayersController', () => {
    let prayerController: PrayerController;
    let prayerService: PrayerService;
    const prayer = {
        label: 'Ore pela igreja',
        prayerRequest: 'God bless local churches'
    }

    const prayer2 = {
        label: 'Ore por missões',
        prayerRequest: 'God bless all the missionaries'
    }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [PrayerController],
            providers: [PrayerService]
        })
            .overrideProvider(PrayerService)
            .useClass(PrayerServiceMock)
            .compile();

        prayerController = moduleRef.get<PrayerController>(PrayerController);
        prayerService = moduleRef.get<PrayerService>(PrayerService);
    });

    describe('findAll', () => {
        it('should return a all the prayers requests', async () => {
            const result = [{
                id: 1,
                ...prayer
            }];

            expect(await prayerController.findAll()).toStrictEqual(result);
        });
    });

    describe('create', () => {
        it('should create a new prayer request', async () => {
            const result = {
                id: 2,
                ...prayer
            }

            expect(await prayerController.create(prayer as Prayer)).toStrictEqual(result);
        });
    });

    describe('update', () => {
        it('should update an existing prayer request by its ID', async () => {
            let result: void 

            expect (await prayerController.update(1, prayer2 as Prayer)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should remove a prayer request by its ID', async () => {
            let result: void

            expect(await prayerController.remove(2)).toBe(result);   
        });
    });
})