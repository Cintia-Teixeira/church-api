import { Controller, Get } from '@nestjs/common';
import { PrayerService } from './prayer.service';

@Controller('oracoes')
export class PrayerController {

    constructor(private prayerService: PrayerService) { }

    @Get()
    public findAll() {
        return this.prayerService.findAll()
    }
}