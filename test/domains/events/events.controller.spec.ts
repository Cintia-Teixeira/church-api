import { EventsServiceMock } from './../../common/models/eventsServiceMock';
import { Test } from '@nestjs/testing';

import { EventsService } from './../../../src/domains/events/events.service';
import { EventsController } from './../../../src/domains/events/events.controller';
import { Event } from '../../../src/common/models/event.entity';


describe('EventsController', () => {
    let eventsController: EventsController;
    let eventsService: EventsService;
    let event = {
        date: new Date('2021-01-13 08:00:00'),
        name: 'III Jornada Teológica',
        description: 'Jornada'
    }

    let event2 = {
        date: new Date('2021-05-01 10:00:00'),
        name: 'IV Jornada Teológica',
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

            expect(await eventsController.create(event as Event)).toStrictEqual(result);
        });
    });

    describe('update', () => {
        it('should update an existing event using its ID', async () => {
            let result: void

            expect(await eventsController.update(1, event2 as Event)).toBe(result);
        });
    });

    describe('delete', () => {
        it('should remove an existing event by its ID', async () => {
            let result: void

            expect(await eventsController.delete(2)).toBe(result);
        });
    });
})