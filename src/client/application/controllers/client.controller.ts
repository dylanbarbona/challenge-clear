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
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CLIENT_SERVICE_PROVIDER,
  ClientService,
} from '../services/client.service';
import { Request, Response } from 'express';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';
import { ClientResponse } from '../responses/client.response';

@Controller('clients')
@ApiTags('Client')
export class ClientController {
  constructor(
    @Inject(CLIENT_SERVICE_PROVIDER)
    private readonly clientService: ClientService,
  ) {}

  @Get()
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'state', required: false })
  @ApiOperation({ summary: 'Search clients' })
  @ApiResponse({ type: [ClientResponse] })
  async findAll(@Req() request: Request, @Res() response: Response) {
    const clients = await this.clientService.findAll(request.query);
    response
      .status(HttpStatus.OK)
      .json(clients.map((client) => new ClientResponse(client)));
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get client' })
  @ApiOkResponse({ type: ClientResponse })
  async get(@Param('id') id: string | number, @Res() response: Response) {
    const client = await this.clientService.get(id);
    response.status(HttpStatus.OK).json(new ClientResponse(client));
  }

  @Post()
  @ApiOperation({ summary: 'Create client' })
  @ApiCreatedResponse({ type: ClientResponse })
  async create(
    @Body() createClientDto: CreateClientDto,
    @Res() response: Response,
  ) {
    const client = await this.clientService.create(createClientDto);
    response.status(HttpStatus.CREATED).json(new ClientResponse(client));
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update client' })
  @ApiOkResponse({ type: ClientResponse })
  async update(
    @Param('id') id: number | string,
    @Body() updateUserDto: UpdateClientDto,
    @Res() response: Response,
  ) {
    const client = await this.clientService.update(id, updateUserDto);
    response.status(HttpStatus.OK).json(new ClientResponse(client));
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete client' })
  @ApiOkResponse({ type: ClientResponse })
  async delete(@Param('id') id: number | string, @Res() response: Response) {
    const client = await this.clientService.delete(id);
    response.status(HttpStatus.OK).json(new ClientResponse(client));
  }
}
