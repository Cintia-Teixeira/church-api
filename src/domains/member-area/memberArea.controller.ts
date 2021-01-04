import { Body, Controller, Get, Post } from '@nestjs/common';

import { MemberAreaService } from './memberArea.service';
import { Member } from '../../common/models/member.entity';

@Controller('area-do-membro')
export class MemberAreaController {

    constructor(private memberAreaService: MemberAreaService) {}
    
    @Get()
    public findAll() {
        return this.memberAreaService.findAll()
    }

    @Post()
    public create(@Body() member: Member) {
        return this.memberAreaService.create(member);
    }
}