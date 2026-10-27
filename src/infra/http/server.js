import app from './app.js';
import prisma from '../database/prisma.js';

const PORT = Number(process.env.PORT || 3000);
const server = app.listen(PORT, () => console.log(`API de veículos rodando em http://localhost:${PORT}`));

async function shutdown(signal) {
  console.log(`Recebido ${signal}. Encerrando servidor...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

export default server;
