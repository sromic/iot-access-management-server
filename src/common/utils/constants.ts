import { ValueOf } from '../types';

export const GENERIC_ID_IDENTIFIER = 'id';

export const API_PREFIX = 'api';

export const PRISMA_LOG_LEVEL = {
  INFO: 'info',
  QUERY: 'query',
  WARN: 'warn',
  ERROR: 'error',
} as const;

export type PrismaLogLevel = ValueOf<typeof PRISMA_LOG_LEVEL>;
export type PrismaLogLevels = Array<PrismaLogLevel>;

export const TENANT_ID = 'companyId';
