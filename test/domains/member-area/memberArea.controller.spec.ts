import { Test } from '@nestjs/testing';

import { MemberAreaService } from './../../../src/domains/member-area/memberArea.service';
import { MemberAreaController } from './../../../src/domains/member-area/memberArea.controller';
import { MemberAreaServiceMock } from '../../common/models/memberAreaServiceMock';
import { Directorship, Leadership, Member } from './../../../src/common/models/member.entity';


describe('MemberAreaController', () => {
    let memberAreaController: MemberAreaController;
    let memberAreaService: MemberAreaService;
    const member = {
        name: 'Cintia', 
        email: 'cin@email.com',
        telphone: '24999999999', 
        address: 'Rua do Ouvidor, 50',
        leadership: null,
        directorship: Directorship.SS,
        employee: false,
        deacon: false
    };

    const member2 = {
        name: 'Tais', 
        email: 'tais@email.com',
        telphone: '24999999999', 
        address: 'Rua do Ouvidor, 50',
        leadership: Leadership.EBD,
        directorship: Directorship.ST,
        employee: true,
        deacon: false
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

    describe('create', () => {
        it('should create a member', async () => {
            const result = {
                id: 2,
                ... member
            };

            expect(await memberAreaController.create(member as Member)).toStrictEqual(result);
        });
    });

    describe('update', () => {
        it('should update an existing member by its ID', async () => {
            let result: void

            expect(await memberAreaController.update(1, member2 as Member)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should remove a member by its ID', async () => {
            let result: void
            
            expect(await memberAreaController.remove(2)).toBe(result);
        })
    })
})