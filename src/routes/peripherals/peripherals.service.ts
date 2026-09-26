import { BadRequestException, Injectable } from '@nestjs/common';
import { fileURLToPath } from 'node:url';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from '../../core/database/database.service.js';
import { loadQueries } from '../../core/database/load-queries/load-queries.js';
import { CreatePeripheralDto } from './dto/create-peripheral.dto.js';

const queries = loadQueries(
    {
        findComputerIdBySerial: 'find-computer-id-by-serial.sql',
        upsert: 'upsert.sql',
        findBySyncId: 'find-by-sync-id.sql',
        softDelete: 'soft-delete.sql',
    },
    fileURLToPath(new URL('./sql/', import.meta.url)),
);

@Injectable()
export class PeripheralsService {
    constructor(private readonly database: DatabaseService) {}
    async upsert(
        body: CreatePeripheralDto,
    ): Promise<{ peripheral: RowDataPacket; created: boolean }> {
        const serial = body.computerSerialNumber?.trim();
        let computerId: number | null = null;
        if (serial) {
            const [computers] = await this.database.pool.execute<
                RowDataPacket[]
            >(await queries.findComputerIdBySerial(), [serial]);
            if (!computers[0])
                throw new BadRequestException(
                    `Linked computer ${serial} was not found.`,
                );
            computerId = computers[0].id;
        }
        const values = [
            body.syncId.trim(),
            computerId,
            body.type.trim(),
            body.manufacturer?.trim() || null,
            body.model?.trim() || null,
            body.serialNumber?.trim() || null,
            body.assetTag?.trim() || null,
            body.assignedUser?.trim() || null,
            body.remarks?.trim() || null,
        ];
        const [result] = await this.database.pool.execute<ResultSetHeader>(
            await queries.upsert(),
            values,
        );
        const [rows] = await this.database.pool.execute<RowDataPacket[]>(
            await queries.findBySyncId(),
            [values[0]],
        );
        return { peripheral: rows[0], created: result.affectedRows === 1 };
    }
    async softDelete(syncId: string): Promise<boolean> {
        const [result] = await this.database.pool.execute<ResultSetHeader>(
            await queries.softDelete(),
            [syncId.trim()],
        );
        return result.affectedRows > 0;
    }
}
