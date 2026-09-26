import { Module } from '@nestjs/common';
import { ComputersModule } from './routes/computers/computers.module.js';
import { PeripheralsModule } from './routes/peripherals/peripherals.module.js';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './routes/health/health.controller.js';
import { DatabaseModule } from './core/database/database.module.js';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        ComputersModule,
        PeripheralsModule,
    ],
    controllers: [HealthController],
})
export class AppModule {}
