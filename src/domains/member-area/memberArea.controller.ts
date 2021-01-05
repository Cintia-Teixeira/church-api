import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { MemberAreaService } from './memberArea.service';
import { Member } from '../../common/models/member.entity';

@Controller('area-do-membro')
export class MemberAreaController {

    constructor(private memberAreaService: MemberAreaService) { }

    @Get()
    public findAll() {
        return this.memberAreaService.findAll()
    }

    @Post()
    public create(@Body() member: Member) {
        return this.memberAreaService.create(member);
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() member: Member) {
        const updated = await this.memberAreaService.update(id, member);
        if (!updated) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: 'Event not found.'
            });
        }
    }
}