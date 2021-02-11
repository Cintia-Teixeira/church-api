import { Body, Controller, Get, Param, Post, Put, NotFoundException, HttpStatus, Delete } from '@nestjs/common';

import { PrayerService } from './prayer.service';
import { Prayer } from './../../common/models/prayer.entity';

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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Put(':id')
    public async update(@Param('id') id: number, @Body() prayer: Prayer) {
        const updated = await this.prayerService.update(id, prayer);
        if(!updated) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: 'Prayer request not found.'
            });
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Delete(':id')
    public async remove(@Param('id') id: number) {
      const removed = await this.prayerService.remove(id);
      if(!removed) {
          throw new NotFoundException({
              status: HttpStatus.NOT_FOUND,
              message: 'Prayer request not found'
          });
      }
    }
}