import { Repository, Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Member } from '../../common/models/member.entity';

@Injectable()
export class MemberAreaService {
    private memberAreaRepository: Repository<Member>

    constructor(connection: Connection) {
        this.memberAreaRepository = connection.getRepository(Member);
    }

    public findAll(): Promise<Member[]> {
        return this.memberAreaRepository.find();
    }

    public async create(member: Member): Promise<Member> {
        const { raw: { insertId } } = await this.memberAreaRepository.insert(member);
        return {
            id: insertId,
            ...member
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async update(id: number, member: Member) {
        const updated = await this.memberAreaRepository.update(id, member);
        return updated.affected;        
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async remove(id: number) {
        const removed = await this.memberAreaRepository.delete(id);
        return removed.affected;
    }
}