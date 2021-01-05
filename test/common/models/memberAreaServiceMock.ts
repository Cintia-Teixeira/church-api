import { Injectable } from '@nestjs/common';
import { Directorship } from '../../../src/common/models/member.entity';

@Injectable()
export class MemberAreaServiceMock {

    private members = [
        {
            id: 1,
            name: 'Cintia',
            email: 'cin@email.com',
            telphone: '24999999999',
            address: 'Rua do Ouvidor, 50',
            leadership: null,
            directorship: Directorship.SS,
            employee: false,
            deacon: false
        }
    ]

    private indexToInsert = 2;

    public findAll() {
        return this.members;
    }

    public create(member) {
        const toCreate = {
            id: this.indexToInsert++,
            ...member
        }
        this.members.push(toCreate);

        return toCreate;
    }

    public update(id, member) {
        const toUpdate = this.members.findIndex(member => member.id === id);
        this.members[toUpdate] = { ...this.members[toUpdate], ...member };
    }

    public remove(id) {
        const filtered = this.members.filter(member => member.id !== id);
        this.members = filtered;
    }
}