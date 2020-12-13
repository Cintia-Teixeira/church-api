import { EventsService } from './events.service';
import { Controller, Get } from "@nestjs/common";

@Controller()
export class EventsController {

    constructor(private eventsService: EventsService) { }

    @Get()
    public findAll() {
        return this.eventsService.findAll();
    }
}