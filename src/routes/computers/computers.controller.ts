import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ComputersService } from './computers.service.js';
import { CreateComputerDto } from './dto/create-computer.dto.js';

@Controller('computers')
export class ComputersController {
    constructor(private readonly computersService: ComputersService) {}

    @Post()
    async create(
        @Body() body: CreateComputerDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.computersService.upsert(body);
        response.status(result.created ? 201 : 200);
        return result;
    }
}
