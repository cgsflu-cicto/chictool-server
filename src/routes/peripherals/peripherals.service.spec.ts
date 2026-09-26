import { describe, expect, it, vi } from 'vitest';
import { PeripheralsService } from './peripherals.service.js';

describe('PeripheralsService', () => {
    it('links a peripheral to its synchronized computer', async () => {
        const pool = {
            execute: vi.fn(async (sql: string, values: unknown[]) => {
                if (sql.startsWith('SELECT id')) return [[{ id: 12 }]];
                if (sql.startsWith('INSERT')) return [{ affectedRows: 1 }];
                return [[{ syncId: values[0], computerId: 12 }]];
            }),
        };
        const service = new PeripheralsService({ pool } as never);
        await expect(
            service.upsert({
                syncId: 'sync-1',
                computerSerialNumber: 'PC-01',
                type: 'Monitor',
            }),
        ).resolves.toMatchObject({
            created: true,
            peripheral: { computerId: 12 },
        });
    });
});
