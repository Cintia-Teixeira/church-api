import { Controller, Get } from '@nestjs/common';

import { MemberAreaService } from './memberArea.service';

@Controller('area-do-membro')
export class MemberAreaController {

    constructor(private memberAreaService: MemberAreaService) {}
    
    @Get()
    public findAll() {
        return this.memberAreaService.findAll()
    }
}