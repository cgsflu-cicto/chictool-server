import { describe, expect, it } from 'vitest';
import { loadQueries } from './load-queries.js';

describe('loadQueries', () => {
    it('maps nested file definitions to cached lazy readers', async () => {
        const queries = loadQueries(
            { inventory: { schema: 'sql/schema.sql' } },
            process.cwd(),
        );

        const firstRead = queries.inventory.schema();
        const secondRead = queries.inventory.schema();
        expect(secondRead).toBe(firstRead);
        await expect(firstRead).resolves.toContain(
            'CREATE TABLE IF NOT EXISTS computers',
        );
    });
});
