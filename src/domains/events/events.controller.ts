import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { EventsService } from './events.service';
import { Event } from '../../common/models/event.entity';

@Controller('eventos')
export class EventsController {

    constructor(private eventsService: EventsService) { }

    @Get()
    public findAll() {
        return this.eventsService.findAll();
    }

    @Post()
    public create(@Body() event: Event) {
        return this.eventsService.create(event);
    }

    @Put(':id')
    public update(@Param('id') id: number, @Body() event: Event) {
        return this.eventsService.update(id, event);
    }
}