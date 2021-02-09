import { Prayer } from './../../common/models/prayer.entity';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PrayerService } from './prayer.service';

@Controller('oracoes')
export class PrayerController {

    constructor(private prayerService: PrayerService) { }

    @Get()
    public findAll(): Promise<Prayer[]> {
        return this.prayerService.findAll();
    }

    @Post()
    public create(@Body() prayer: Prayer): Promise<Prayer> {
        return this.prayerService.create(prayer);
    }

    @Put(':id')
    public update(@Param('id') id: number, @Body() prayer: Prayer) {
        return this.prayerService.update(id, prayer);
    }
}