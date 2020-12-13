import { Controller, Get } from "@nestjs/common";

@Controller()
export class EventsController {

    private events = [
        {
            id: 1,
            date: '05/05/2018',
            name: 'III Jornada Teológica',
            time: '9h',
            description: 'Jornada'
        }
    ]

    @Get()
    public findAll() {
        return this.events;
    }
}