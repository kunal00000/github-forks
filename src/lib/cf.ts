import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export function getDB(cfEnv: CloudflareEnv ) {
  const adapter = new PrismaD1(cfEnv.DB);
  return new PrismaClient({ adapter });
}