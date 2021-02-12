import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { EventsService } from './events.service';
import { Event } from '../../common/models/event.entity';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { NestResponse } from 'src/core/http/nest-response';

@Controller('eventos')
export class EventsController {

    constructor(private eventsService: EventsService) { }

    @Get()
    public findAll(): Promise<Event[]> {
        return this.eventsService.findAll();
    }

    @Post()
    public async create(@Body() event: Event): Promise<NestResponse> {
        const created = await this.eventsService.create(event);
        const eventName = created.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g,"-");
        return new NestResponseBuilder()
            .setStatus(HttpStatus.CREATED)
            .setHeaders({
                'Location': `/eventos/${eventName}`
            })
            .setBody(created)
            .build();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Delete(':id')
    public async remove(@Param('id') id: number) {
        const removed = await this.eventsService.remove(id);
        if (!removed) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: 'Event not found.'
            });
        }
    }
}