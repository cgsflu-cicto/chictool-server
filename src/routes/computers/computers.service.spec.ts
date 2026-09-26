import { describe, expect, it, vi } from 'vitest';
import { ComputersService } from './computers.service.js';

describe('ComputersService', () => {
    it('upserts with normalized serial numbers and a default collection time', async () => {
        let inserted: unknown[] = [];
        const pool = {
            execute: vi.fn(async (sql: string, values: unknown[]) => {
                if (sql.startsWith('INSERT')) {
                    inserted = values;
                    return [{ affectedRows: 1 }];
                }
                return [[{ id: 1, serialNumber: values[0] }]];
            }),
        };
        const service = new ComputersService({ pool } as never);
        await expect(
            service.upsert({
                serialNumber: ' SN-01 ',
                machineType: 'Laptop',
                office: 'HQ',
            }),
        ).resolves.toEqual({
            computer: { id: 1, serialNumber: 'SN-01' },
            created: true,
        });
        expect(inserted[0]).toBe('SN-01');
    });
});
