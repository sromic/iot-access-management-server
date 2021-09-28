import { Maybe } from '../types';

import { PRISMA_LOG_LEVEL, PrismaLogLevels } from './constants';

/**
 *
 * @param logLevels
 * @returns
 */
export const parsePrismaLogLevel = (
  logLevels: string,
): Maybe<PrismaLogLevels> => {
  if (!logLevels) {
    return undefined;
  }

  const levels = logLevels.split(',');
  const validLogLevels = levels
    .filter((l) => Object.values(PRISMA_LOG_LEVEL).find((v) => v === l))
    .map((l) => {
      const logLvl = Object.entries(PRISMA_LOG_LEVEL).find((v) => v[1] === l);
      return logLvl[1];
    });
  return validLogLevels;
};
