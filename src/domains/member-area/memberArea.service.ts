import { Repository, Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Member } from '../../common/models/member.entity';

@Injectable()
export class MemberAreaService {
    private memberAreaRepository: Repository<Member>

    constructor(connection: Connection) {
        this.memberAreaRepository = connection.getRepository(Member);
    }

    public findAll() {
        return this.memberAreaRepository.find();
    }

    public async create(member) {
        const { raw: { insertId } } = await this.memberAreaRepository.insert(member);
        return {
            id: insertId,
            ...member
        }
    }

    public update(id, member) {
        
    }
}