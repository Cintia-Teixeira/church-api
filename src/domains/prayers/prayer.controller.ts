import { Prayer } from './../../common/models/prayer.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrayerService } from './prayer.service';

@Controller('oracoes')
export class PrayerController {

    constructor(private prayerService: PrayerService) { }

    @Get()
    public findAll() {
        return this.prayerService.findAll();
    }

    @Post()
    public create(@Body() prayer: Prayer) {
        return this.prayerService.create(prayer);
    }
}