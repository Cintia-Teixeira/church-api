import { Test } from '@nestjs/testing';

import { MemberAreaService } from './../../../src/domains/member-area/memberArea.service';
import { MemberAreaController } from './../../../src/domains/member-area/memberArea.controller';
import { MemberAreaServiceMock } from '../../common/models/memberAreaServiceMock';


describe('MemberAreaController', () => {
    let memberAreaController: MemberAreaController;
    let memberAreaService: MemberAreaService;
    let member = {
        name: 'Cintia', 
        email: 'cin@email.com',
        telphone: 24999999999, 
        address: 'Rua do Ouvidor, 50'
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [MemberAreaController],
            providers: [MemberAreaService]
        })
            .overrideProvider(MemberAreaService)
            .useClass(MemberAreaServiceMock)
            .compile();

        memberAreaController = moduleRef.get<MemberAreaController>(MemberAreaController);
        memberAreaService = moduleRef.get<MemberAreaService>(MemberAreaService);
    });

    describe('findAll', () => {
        it('should return a list of all members', async () => {
            const result = [{
                id: 1,
                ...member
            }]

            expect(await memberAreaController.findAll()).toStrictEqual(result);
        });
    });
})