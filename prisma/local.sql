-- Local SQLite playground database for the Vehicle API.
-- Run with: npx prisma db execute --file prisma/local.sql

CREATE TABLE IF NOT EXISTS "veiculos" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "placa_veiculo" TEXT NOT NULL CONSTRAINT "veiculos_placa_veiculo_key" UNIQUE,
  "modelo_veiculo" TEXT NOT NULL,
  "preco_veiculo" REAL NOT NULL,
  "deleted_at" DATETIME,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "veiculos_modelo_veiculo_idx"
  ON "veiculos" ("modelo_veiculo");

CREATE INDEX IF NOT EXISTS "veiculos_deleted_at_idx"
  ON "veiculos" ("deleted_at");

INSERT OR IGNORE INTO "veiculos"
  ("placa_veiculo", "modelo_veiculo", "preco_veiculo", "created_at", "updated_at")
VALUES
  ('ABC-1234', 'Honda Civic', 95000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('DEF-5678', 'Toyota Corolla', 110000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('GHI-9012', 'Volkswagen T-Cross', 125000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
