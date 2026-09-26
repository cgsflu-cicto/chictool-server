import { Module } from '@nestjs/common';
import { ComputersService } from './computers.service.js';
import { ComputersController } from './computers.controller.js';

@Module({
    controllers: [ComputersController],
    providers: [ComputersService],
})
export class ComputersModule {}
