import { PrayerServiceMock } from '../../common/models/prayerServiceMock';
import { Test } from '@nestjs/testing';
import { PrayerService } from '../../../src/domains/prayers/prayer.service';
import { PrayerController } from '../../../src/domains/prayers/prayer.controller';

describe('PrayersController', () => {
    let prayerController: PrayerController;
    let prayerService: PrayerService;
    let prayer = {
        label: 'Ore pela igreja',
        prayerRequest: 'God bless local churches'
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
})