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

    public findAll() {
        return this.prayers;
    }
}