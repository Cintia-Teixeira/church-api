import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {

    private events = [
        {
            id: 1,
            date: '05/05/2018',
            name: 'III Jornada Teológica',
            time: '9h',
            description: 'Jornada'
        }
    ]

    public findAll() {
        return this.events;
    }
}