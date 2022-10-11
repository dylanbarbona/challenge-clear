import { Inject, Injectable } from '@nestjs/common';
import {
  MEMBER_REPOSITORY_PROVIDER,
  MemberRepository,
} from '../../domain/contracts/member.repository';
import { CreateMemberDto, UpdateMemberDto } from '../dto/member.dto';
import { Member } from '../../domain/entities/member.entity';

export const MEMBER_SERVICE_PROVIDER = 'MEMBER_SERVICE_PROVIDER';

@Injectable()
export class MemberService {
  constructor(
    @Inject(MEMBER_REPOSITORY_PROVIDER)
    private memberRepository: MemberRepository,
  ) {}

  async findAll(): Promise<Member[]> {
    return this.memberRepository.findAll();
  }

  async get(id: string | number): Promise<Member> {
    return this.memberRepository.get(id);
  }

  async create({
    client_id,
    ...createMemberDto
  }: CreateMemberDto): Promise<Member> {
    return this.memberRepository.create(createMemberDto, client_id);
  }

  async update(id: string | number, updateMemberDto: UpdateMemberDto) {
    return this.memberRepository.update(id, updateMemberDto);
  }

  async delete(id: string | number): Promise<Member> {
    return this.memberRepository.delete(id);
  }

  async change(
    member_id: string | number,
    client_id: string | number,
  ): Promise<Member> {
    return this.memberRepository.change(member_id, client_id);
  }
}
