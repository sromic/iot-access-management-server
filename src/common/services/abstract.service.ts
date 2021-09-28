import { AbstractRepository } from '../repositories';
import { Maybe } from '../types';

export abstract class AbstractService<ID, T> {
  constructor(protected readonly repository: AbstractRepository<ID, T>) {}

  abstract getById(id: ID): Promise<Maybe<T>>;
}
