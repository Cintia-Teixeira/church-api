import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { MemberAreaService } from './memberArea.service';
import { Member } from '../../common/models/member.entity';
import { NestResponse } from '../../core/http/nest-response';
import { NestResponseBuilder } from '../../core/http/nest-response-builder';

@Controller('area-do-membro')
export class MemberAreaController {

    constructor(private memberAreaService: MemberAreaService) { }

    @Get()
    public findAll(): Promise<Member[]> {
        return this.memberAreaService.findAll()
    }

    @Post()
    public async create(@Body() member: Member): Promise<NestResponse> {
        const created = await this.memberAreaService.create(member);
        const memberName = created.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g,"-");
        return new NestResponseBuilder()
            .setStatus(HttpStatus.CREATED)
            .setHeaders({
                'Location': `/area-do-membro/${memberName}`
            })
            .setBody(created)
            .build();
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