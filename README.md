# Lucas Antonete - N2 Server-side Project

REST API for vehicles built with Node.js, Express, Prisma ORM and SQLite.

## Architecture

- `src/domain`: pure JavaScript business rules and domain errors.
- `src/application`: use cases that orchestrate business flows.
- `src/infra`: Express HTTP delivery, Prisma client and repository implementation.
- `src/presentation`: HTTP controllers.

## Running

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:push
npm run db:seed:sql
npm start
```

The application loads variables from `.env`. If a request returns a database error, make sure `.env` exists and run `npm run prisma:generate` followed by `npm run prisma:push` before starting the server.

For a local playground, `prisma/local.sql` creates the SQLite table, indexes and three example vehicles. Run it with `npm run db:seed:sql`. The command is idempotent and can be executed more than once.

The API is available under `/api`. The original routes without the `/api` prefix are also supported.

Interactive API documentation is available at [http://localhost:3000/docs](http://localhost:3000/docs). The raw OpenAPI document is available at `/docs.json`.

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/veiculos` | Create a vehicle |
| GET | `/api/veiculos` | List active vehicles |
| GET | `/api/veiculos/:id` | Find by ID |
| GET | `/api/veiculos/busca?modelo=...` | Search by model |
| PUT | `/api/veiculos/:id` | Update a vehicle |
| DELETE | `/api/veiculos/:id` | Soft deletion |
| DELETE | `/api/veiculos/:id?definitiva=true` | Permanent deletion |

The Portuguese field names are part of the assignment contract and are therefore preserved in request and database payloads: `placa_veiculo`, `modelo_veiculo` and `preco_veiculo`.
