import { MemberRepository } from '../../domain/contracts/member.repository';
import { Member } from '../../domain/entities/member.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberDocument } from '../schemas/member.schema';
import { NotFoundException } from '@nestjs/common';

export class MemberMongoRepository implements MemberRepository {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  async findAll(): Promise<Member[]> {
    return this.memberModel.find({}, {}, { populate: 'client' });
  }

  async get(id: string | number): Promise<Member> {
    let member = null;
    try {
      member = await this.memberModel.findById(id, {}, { populate: 'client' });
    } catch (e) {
      throw new NotFoundException();
    }
    if (!member) throw new NotFoundException();
    return member;
  }

  async create(member: Member, client_id: string): Promise<Member> {
    let newMember = await new this.memberModel({
      client: client_id,
      ...member,
    });
    newMember = await newMember.save();
    return this.get(newMember._id);
  }

  async update(id: string, member: Member): Promise<Member> {
    let memberUpdated = null;
    try {
      memberUpdated = await this.memberModel.findByIdAndUpdate(id, member, {
        populate: 'client',
        new: true,
      });
    } catch (e) {
      throw new NotFoundException();
    }
    if (!memberUpdated) throw new NotFoundException();
    return memberUpdated;
  }

  async delete(id: string): Promise<Member> {
    let memberDeleted = null;
    try {
      memberDeleted = await this.memberModel.findByIdAndDelete(id, {
        populate: 'client',
      });
    } catch (e) {
      throw new NotFoundException();
    }
    if (!memberDeleted) throw new NotFoundException();
    return memberDeleted;
  }

  async change(member_id: string, client_id: string): Promise<Member> {
    let memberUpdated = null;
    try {
      memberUpdated = await this.memberModel.findByIdAndUpdate(
        member_id,
        { client: client_id },
        {
          populate: 'client',
          new: true,
        },
      );
    } catch (e) {
      throw new NotFoundException();
    }
    if (!memberUpdated) throw new NotFoundException();
    return memberUpdated;
  }
}
