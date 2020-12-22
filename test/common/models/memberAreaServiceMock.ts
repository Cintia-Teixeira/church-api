import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberAreaServiceMock {

    private members = [
        {
            id: 1,
            name: 'Cintia',
            email: 'cin@email.com',
            telphone: 24999999999,
            address: 'Rua do Ouvidor, 50'
        }
    ]

    public findAll() {
        return this.members;
    }
}