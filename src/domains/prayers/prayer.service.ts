import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';

import { Prayer } from './../../common/models/prayer.entity';

@Injectable()
export class PrayerService {
    private prayerRepository: Repository<Prayer>;

    constructor(connection: Connection) {
        this.prayerRepository = connection.getRepository(Prayer);
    }

    public findAll() {
        return this.prayerRepository.find();
    }
}