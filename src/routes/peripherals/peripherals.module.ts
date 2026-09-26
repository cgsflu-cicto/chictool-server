import { Module } from '@nestjs/common';
import { PeripheralsService } from './peripherals.service.js';
import { PeripheralsController } from './peripherals.controller.js';

@Module({
    controllers: [PeripheralsController],
    providers: [PeripheralsService],
})
export class PeripheralsModule {}
