import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';

import { Prayer } from './../../common/models/prayer.entity';

@Injectable()
export class PrayerService {
    private prayerRepository: Repository<Prayer>;

    constructor(connection: Connection) {
        this.prayerRepository = connection.getRepository(Prayer);
    }

    public findAll(): Promise<Prayer[]> {
        return this.prayerRepository.find();
    }

    public async create(prayer: Prayer): Promise<Prayer> {
        const { raw: { insertId } } = await this.prayerRepository.insert(prayer);
        return {
            id: insertId,
            ...prayer
        }
    }

    public async update(id: number, prayer: Prayer) {
        return 'Updated';
    }
}