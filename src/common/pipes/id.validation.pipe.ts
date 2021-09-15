import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { AbstractService } from '../services';

/**
 * Validate if givem query or param id exists in underlying storage
 * and throw @NotFoundException in case it doesn't
 */
@Injectable()
export class IdValidationPipe<ID, T> implements PipeTransform<ID, any> {
  constructor(
    private readonly service: AbstractService<ID, T>,
    private readonly idIdentifiers: string[],
  ) {}

  async transform(value: ID, metadata: ArgumentMetadata) {
    if (
      metadata.type === 'param' ||
      (metadata.type === 'query' &&
        this.idIdentifiers?.includes(metadata?.data))
    ) {
      const entity = await this.service.getById(value);

      if (!entity) {
        throw new NotFoundException('Resource not found');
      }
    }

    return value;
  }
}
