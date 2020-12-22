import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';

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
    public async update(@Param('id') id: number, @Body() event: Event) {
        const updated = await this.eventsService.update(id, event);
        if (!updated) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: 'Event not found.'
            });
        }
    }

    @Delete(':id')
    public async delete(@Param('id') id: number) {
        const deleted = await this.eventsService.delete(id);
        if (!deleted) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: 'Event not found.'
            });
        }
    }
}