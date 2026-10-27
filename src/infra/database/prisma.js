import 'dotenv/config';
import prismaPackage from '@prisma/client';

const { PrismaClient } = prismaPackage;

const prisma = new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'] });

export default prisma;
