import { Repository, Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Event } from './../../../src/common/models/event.entity';

@Injectable()
export class EventsService {

    private eventsRepository: Repository<Event>

    constructor(connection: Connection) {
        this.eventsRepository = connection.getRepository(Event);
    }

    public findAll() {
        return this.eventsRepository.find()
    }
}