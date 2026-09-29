import { Injectable } from '@nestjs/common';
import type { RowDataPacket } from 'mysql2';
import { DatabaseService } from '../../core/database/database.service.js';

export interface LookupValue {
    source: string;
    value: string;
    label: string;
    sortOrder: number;
    isActive: boolean;
}

@Injectable()
export class LookupsService {
    constructor(private readonly database: DatabaseService) {}

    async list(): Promise<LookupValue[]> {
        const [rows] = await this.database.pool.query<RowDataPacket[]>(`
            SELECT source, value, label, sortOrder, isActive
            FROM lookup_values
            ORDER BY source, sortOrder, label, value
        `);
        return rows.map((row) => ({
            source: row.source,
            value: row.value,
            label: row.label,
            sortOrder: Number(row.sortOrder),
            isActive: Boolean(row.isActive),
        }));
    }
}
