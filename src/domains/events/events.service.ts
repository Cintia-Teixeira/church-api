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

    public async create(event: Event) {
        const { raw: { insertId } } = await this.eventsRepository.insert(event);
        return {
            id: insertId,
            ...event
        }
    }

    public async update(id: number, event: Event) {
        const updated = await this.eventsRepository.update(id, event);
        return updated.affected;
    }
}