import {
    Controller,
    Post,
    Body,
    Delete,
    Param,
    Res,
    NotFoundException,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { PeripheralsService } from './peripherals.service.js';
import { CreatePeripheralDto } from './dto/create-peripheral.dto.js';

@Controller('peripherals')
export class PeripheralsController {
    constructor(private readonly peripheralsService: PeripheralsService) {}

    @Post()
    async create(
        @Body() body: CreatePeripheralDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.peripheralsService.upsert(body);
        response.status(result.created ? 201 : 200);
        return result;
    }

    @Delete(':syncId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('syncId') syncId: string): Promise<void> {
        if (!(await this.peripheralsService.softDelete(syncId)))
            throw new NotFoundException('Peripheral record was not found.');
    }
}
