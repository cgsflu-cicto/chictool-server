import { Controller, Get } from '@nestjs/common';
import { LookupsService } from './lookups.service.js';

@Controller('lookups')
export class LookupsController {
    constructor(private readonly lookupsService: LookupsService) {}

    @Get()
    async list() {
        return { lookups: await this.lookupsService.list() };
    }
}
