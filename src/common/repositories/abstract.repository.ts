import { Maybe } from '../types';

import { PrismaRepository } from './prisma.repository';

export abstract class AbstractRepository<ID, T> {
  constructor(protected readonly prismaRepository: PrismaRepository) {}

  abstract getById(id: ID): Promise<Maybe<T>>;
}
