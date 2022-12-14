import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  MEMBER_SERVICE_PROVIDER,
  MemberService,
} from '../services/member.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemberResponse } from '../responses/member.response';
import { CreateMemberDto, UpdateMemberDto } from '../dto/member.dto';
import { Response } from 'express';

@Controller('members')
@ApiTags('Member')
export class MemberController {
  constructor(
    @Inject(MEMBER_SERVICE_PROVIDER)
    private readonly memberService: MemberService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Search members' })
  @ApiResponse({ type: [MemberResponse] })
  async findAll(@Res() response: Response) {
    const members = await this.memberService.findAll();
    response
      .status(HttpStatus.OK)
      .json(members.map((member) => new MemberResponse(member)));
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get member' })
  @ApiResponse({ type: MemberResponse })
  async get(@Param('id') id, @Res() response: Response) {
    const member = await this.memberService.get(id);
    response.status(HttpStatus.OK).json(new MemberResponse(member));
  }

  @Post()
  @ApiOperation({ summary: 'Create members' })
  @ApiResponse({ type: MemberResponse })
  async create(
    @Body() createMemberDto: CreateMemberDto,
    @Res() response: Response,
  ) {
    const member = await this.memberService.create(createMemberDto);
    response.status(HttpStatus.CREATED).json(new MemberResponse(member));
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update member' })
  @ApiResponse({ type: MemberResponse })
  async update(
    @Param('id') id: number | string,
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() response: Response,
  ) {
    const member = await this.memberService.update(id, updateMemberDto);
    response.status(HttpStatus.OK).json(new MemberResponse(member));
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete member' })
  @ApiResponse({ type: MemberResponse })
  async delete(@Param('id') id: number | string, @Res() response: Response) {
    const member = await this.memberService.delete(id);
    response.status(HttpStatus.OK).json(new MemberResponse(member));
  }

  @Post(':member_id/:client_id')
  @ApiParam({ name: 'member_id' })
  @ApiParam({ name: 'client_id' })
  @ApiOperation({ summary: 'Change client' })
  @ApiResponse({ type: MemberResponse })
  async change(
    @Param('member_id') member_id,
    @Param('client_id') client_id,
    @Res() response: Response,
  ) {
    const member = await this.memberService.change(member_id, client_id);
    response.status(HttpStatus.OK).json(new MemberResponse(member));
  }
}
