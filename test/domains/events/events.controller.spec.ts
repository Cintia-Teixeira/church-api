import { EventsServiceMock } from './../../common/models/eventsServiceMock';
import { Test } from '@nestjs/testing';

import { EventsService } from './../../../src/domains/events/events.service';
import { EventsController } from './../../../src/domains/events/events.controller';


describe('EventsController', () => {
    let eventsController: EventsController;
    let eventsService: EventsService;
    let event = {
        date: '05/05/2018',
        name: 'III Jornada Teológica',
        time: '9h',
        description: 'Jornada'
    }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [EventsController],
            providers: [EventsService]
        })
            .overrideProvider(EventsService)
            .useClass(EventsServiceMock)
            .compile();

        eventsService = moduleRef.get<EventsService>(EventsService);
        eventsController = moduleRef.get<EventsController>(EventsController);
    });

    describe('findAll', () => {
        it('should return all events', async () => {
            const result = [{
                id: 1,
                ...event
            }];

            expect(await eventsController.findAll()).toStrictEqual(result);
        });
    });

    describe('create', () => {
        it('should create an event', async () => {
            const result = {
                id: 2,
                ...event
            };

            expect(await eventsController.create(event)).toStrictEqual(result);
        })
    })
})