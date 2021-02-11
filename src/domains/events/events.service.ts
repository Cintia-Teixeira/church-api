import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';

import { Event } from './../../../src/common/models/event.entity';

@Injectable()
export class EventsService {

    private eventsRepository: Repository<Event>

    constructor(connection: Connection) {
        this.eventsRepository = connection.getRepository(Event);
    }

    public findAll(): Promise<Event[]> {
        return this.eventsRepository.find()
    }

    public async create(event: Event): Promise<Event> {
        const { raw: { insertId } } = await this.eventsRepository.insert(event);
        return {
            id: insertId,
            ...event
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async update(id: number, event: Event) {
        const updated = await this.eventsRepository.update(id, event);
        return updated.affected;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async remove(id: number) {
        const removed = await this.eventsRepository.delete(id);
        return removed.affected;
    }
}