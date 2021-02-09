/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';

Injectable()
export class PrayerServiceMock {

    private prayers = [
        {
            id: 1,
            label: 'Ore pela igreja',
            prayerRequest: 'God bless local churches'
        }
    ];

    private indexToInsert = 2;

    public findAll() {
        return this.prayers;
    }

    public create(prayer) {
        const toCreate = {
            id: this.indexToInsert++,
            ...prayer
        }
        this.prayers.push(toCreate);

        return toCreate;
    }

    public update(id, prayer) {
        const toUpdate = this.prayers.findIndex(prayer => prayer.id === id);
        this.prayers[toUpdate] = { ...this.prayers[toUpdate], ...prayer }

    }
}