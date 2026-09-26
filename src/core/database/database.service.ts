import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createPool, type Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    readonly pool: Pool;

    constructor(private readonly config: ConfigService) {
        for (const name of [
            'MYSQL_HOST',
            'MYSQL_DATABASE',
            'MYSQL_USER',
            'MYSQL_PASSWORD',
        ]) {
            if (!config.get<string>(name))
                throw new Error(`${name} must be set.`);
        }
        this.pool = createPool({
            host: config.getOrThrow('MYSQL_HOST'),
            port: Number(config.get('MYSQL_PORT') || 3306),
            database: config.getOrThrow('MYSQL_DATABASE'),
            user: config.getOrThrow('MYSQL_USER'),
            password: config.getOrThrow('MYSQL_PASSWORD'),
            waitForConnections: true,
            connectionLimit: Number(config.get('MYSQL_CONNECTION_LIMIT') || 10),
            timezone: 'Z',
        });
    }

    async onModuleInit(): Promise<void> {
        if (this.config.get('MYSQL_INIT_SCHEMA') === 'true') {
            const schema = readFileSync(
                join(process.cwd(), 'sql', 'schema.sql'),
                'utf8',
            );
            for (const statement of schema
                .split(/;\s*(?:\r?\n|$)/)
                .map((item) => item.trim())
                .filter(Boolean))
                await this.pool.query(statement);
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.pool.end();
    }
}
