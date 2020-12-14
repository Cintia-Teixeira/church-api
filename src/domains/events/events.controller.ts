import { EventsService } from './events.service';
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('eventos')
export class EventsController {

    constructor(private eventsService: EventsService) { }

    @Get()
    public findAll() {
        return this.eventsService.findAll();
    }
}