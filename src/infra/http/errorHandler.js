import { DomainError } from '../../domain/errors/DomainError.js';

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  if (error instanceof DomainError) return res.status(error.statusCode).json({ error: error.message });
  if (error?.code === 'P2002') return res.status(409).json({ error: 'A vehicle with this plate already exists' });
  if (error?.code === 'P2021') return res.status(503).json({ error: 'Database table is missing. Run: npm run prisma:push' });
  if (error?.name === 'PrismaClientInitializationError') return res.status(503).json({ error: 'Database is unavailable. Check DATABASE_URL and run the Prisma setup commands.' });
  if (error?.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON request body' });
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}
