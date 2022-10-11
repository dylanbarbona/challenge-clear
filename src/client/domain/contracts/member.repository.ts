import { Member } from '../entities/member.entity';

export const MEMBER_REPOSITORY_PROVIDER = 'MEMBER_REPOSITORY_PROVIDER';

export interface MemberRepository {
  findAll(): Promise<Member[]>;
  get(id: string | number): Promise<Member>;
  create(member: Member, client_id: string | number): Promise<Member>;
  update(id: string | number, member: Member): Promise<Member>;
  delete(id: string | number): Promise<Member>;
  change(
    member_id: string | number,
    client_id: string | number,
  ): Promise<Member>;
}
