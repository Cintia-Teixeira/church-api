import { Module } from '@nestjs/common';

import { MemberAreaService } from './memberArea.service';
import { MemberAreaController } from './memberArea.controller';

@Module({
    controllers: [MemberAreaController],
    providers: [MemberAreaService]
})
export class MemberAreaModule { }