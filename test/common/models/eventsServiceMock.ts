import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsServiceMock {

    private events = [
        {
            id: 1,
            date: '05/05/2018',
            name: 'III Jornada Teológica',
            time: '9h',
            description: 'Jornada'
        }
    ]

    private indexToInsert = 2;

    public findAll() {
        return this.events;
    }

    public create(event) {
        const toCreate = {
            id: this.indexToInsert++,
            ...event
        };
        this.events.push(event);
        return toCreate;
    }
}