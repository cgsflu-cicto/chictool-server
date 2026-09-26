import { Injectable } from '@nestjs/common';
import { fileURLToPath } from 'node:url';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from '../../core/database/database.service.js';
import { loadQueries } from '../../core/database/load-queries/load-queries.js';
import { CreateComputerDto } from './dto/create-computer.dto.js';

const queries = loadQueries(
    {
        upsert: 'upsert.sql',
        findBySerial: 'find-by-serial.sql',
    },
    fileURLToPath(new URL('./sql/', import.meta.url)),
);

@Injectable()
export class ComputersService {
    constructor(private readonly database: DatabaseService) {}
    async upsert(
        body: CreateComputerDto,
    ): Promise<{ computer: RowDataPacket; created: boolean }> {
        const columns = [
            'serialNumber',
            'serialOverride',
            'manufacturer',
            'model',
            'operatingSystem',
            'processor',
            'storage',
            'memory',
            'gpu',
            'macAddress',
            'details',
            'hostname',
            'username',
            'machineType',
            'acquiredOn',
            'office',
            'parHolder',
            'primaryUser',
            'remarks',
            'collectedOn',
            'scriptVersion',
        ] as const;
        const values = columns.map((column) =>
            column === 'acquiredOn'
                ? this.date(body.acquiredOn)
                : column === 'collectedOn'
                  ? this.dateTime(body.collectedOn)
                  : typeof body[column] === 'string'
                    ? body[column].trim()
                    : null,
        );
        const [result] = await this.database.pool.execute<ResultSetHeader>(
            await queries.upsert(),
            values,
        );
        const [rows] = await this.database.pool.execute<RowDataPacket[]>(
            await queries.findBySerial(),
            [values[0]],
        );
        return { computer: rows[0], created: result.affectedRows === 1 };
    }
    private date(value?: string): string | null {
        if (!value) return null;
        const text = /^\d{4}$/.test(value)
            ? `${value}-01-01`
            : /^\d{4}-\d{2}$/.test(value)
              ? `${value}-01`
              : value;
        return text;
    }
    private dateTime(value?: string): string {
        return new Date(value || Date.now())
            .toISOString()
            .slice(0, 23)
            .replace('T', ' ');
    }
}
