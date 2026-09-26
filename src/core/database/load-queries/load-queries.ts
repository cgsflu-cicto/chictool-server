import { readFile } from 'node:fs/promises';
import path from 'node:path';

export interface QueryGroup {
    [key: string]: QueryDefinition;
}

export type QueryDefinition = string | QueryGroup;

export type LoadedQueries<T> = T extends string
    ? () => Promise<string>
    : T extends Record<string, QueryDefinition>
      ? { [K in keyof T]: LoadedQueries<T[K]> }
      : never;

const queryCache = new Map<string, Promise<string>>();

function createLazyQuery(filePath: string): () => Promise<string> {
    return () => {
        let promise = queryCache.get(filePath);

        if (!promise) {
            promise = readFile(filePath, 'utf8');
            queryCache.set(filePath, promise);
        }

        return promise;
    };
}

/**
 * Converts a nested SQL-file definition into matching lazy query functions.
 * Query files are only read when invoked and their promises are cached.
 */
export function loadQueries<T extends QueryDefinition>(
    definition: T,
    basePath: string,
): LoadedQueries<T> {
    if (typeof definition === 'string') {
        return createLazyQuery(
            path.join(basePath, definition),
        ) as LoadedQueries<T>;
    }

    return Object.fromEntries(
        Object.entries(definition).map(([key, value]) => [
            key,
            loadQueries(value, basePath),
        ]),
    ) as LoadedQueries<T>;
}
