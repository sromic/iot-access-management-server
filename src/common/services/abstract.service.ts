import { Maybe } from '../types';

export abstract class AbstractService<ID, T> {
  abstract getById(id: ID): Promise<Maybe<T>>;
}
