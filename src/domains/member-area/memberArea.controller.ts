import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { MemberAreaService } from './memberArea.service';
import { Member } from '../../common/models/member.entity';

@Controller('area-do-membro')
export class MemberAreaController {

    constructor(private memberAreaService: MemberAreaService) { }

    @Get()
    public findAll(): Promise<Member[]> {
        return this.memberAreaService.findAll()
    }

    @Post()
    public create(@Body() member: Member): Promise<Member> {
        return this.memberAreaService.create(member);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Delete(':id')
    public async remove(@Param('id') id: number) {
        const removed = await this.memberAreaService.remove(id);
        if (!removed) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: 'Event not found.'
            });
        }
    }
}