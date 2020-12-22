import { Injectable } from '@nestjs/common';
import { Directorship } from '../../../src/common/models/member.entity';

@Injectable()
export class MemberAreaServiceMock {

    private members = [
        {
            id: 1,
            name: 'Cintia',
            email: 'cin@email.com',
            telphone: 24999999999,
            address: 'Rua do Ouvidor, 50',
            leadership: null,
            directorship: Directorship.SS,
            employee: false,
            deacon: false
        }
    ]

    public findAll() {
        return this.members;
    }
}