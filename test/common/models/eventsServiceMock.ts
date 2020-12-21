import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsServiceMock {

    private events = [
        {
            id: 1,
            date: new Date('2021-01-13 08:00:00'),
            name: 'III Jornada Teológica',
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
        this.events.push(toCreate); 
        
        return toCreate;
    }

    public update(id, event) {
        const toUpdate = this.events.findIndex(event => event.id === id);
        this.events[toUpdate] = {...this.events[toUpdate], ...event};
        console.log(this.events);
                
    }
}