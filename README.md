# CHICTool Server

NestJS API for synchronizing CHICTool computer inventory and peripheral records to MySQL.

## Requirements

- Node.js 22 or later
- MySQL 8 or later

## Setup

Install dependencies, then configure MySQL credentials.

```bash
npm install
copy .env.example .env
```

Set the values in `.env`. On a new database, set `MYSQL_INIT_SCHEMA=true` for one start to create the inventory tables from `sql/schema.sql`; then change it back to `false`.

```env
HOST=0.0.0.0
PORT=3000
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=chictool
MYSQL_USER=chictool
MYSQL_PASSWORD=change-me
MYSQL_INIT_SCHEMA=false
```

## Run

```bash
# Development with automatic reload
npm run start:dev

# Production
npm run build
npm run start:prod
```

By default, the API listens on `http://localhost:3000`. CORS is enabled for the desktop client. Set `CORS_ORIGIN` to a comma-separated allowlist when deploying to a browser-accessible environment.

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Verifies MySQL connectivity. |
| `POST` | `/api/computers` | Creates or updates a computer by `serialNumber`. |
| `POST` | `/api/peripherals` | Creates or updates a peripheral by `syncId`. |
| `DELETE` | `/api/peripherals/:syncId` | Soft-deletes a peripheral. |

### Upsert a computer

`serialNumber`, `machineType`, and `office` are required. `acquiredOn` accepts a year (`2026`), year-month (`2026-09`), or full date (`2026-09-24`). `collectedOn` defaults to the request time.

```json
{
  "serialNumber": "ABC123",
  "machineType": "Laptop",
  "office": "Main Office",
  "hostname": "PC-01",
  "manufacturer": "Dell",
  "model": "Latitude 5450",
  "collectedOn": "2026-09-24T03:00:00.000Z"
}
```

The response is `201 Created` for a new record and `200 OK` for an update.

### Upsert a peripheral

`syncId` and `type` are required. Supply `computerSerialNumber` to link the peripheral to a previously synchronized computer; omit it to leave the peripheral unlinked. A missing linked computer returns `400 Bad Request`.

```json
{
  "syncId": "d6e9f6c4-289d-47a4-93c4-44acb2884a3e",
  "computerSerialNumber": "ABC123",
  "type": "Monitor",
  "manufacturer": "Dell",
  "model": "P2422H"
}
```

## Project layout

```text
src/
  core/database/       MySQL pool and lazy SQL-file loader
  routes/
    computers/         Computer sync route, service, DTO, and SQL files
    peripherals/       Peripheral sync route, service, DTO, and SQL files
    health/             Health endpoint
sql/schema.sql         Database schema used by MYSQL_INIT_SCHEMA
```

Route-service SQL is colocated in each feature's `sql/` directory. Nest copies those `.sql` files to `dist` during builds, and `loadQueries` lazily reads and caches them.

## Quality checks

```bash
npm run format
npm run lint
npm test
npm run test:e2e
npm run build
```
