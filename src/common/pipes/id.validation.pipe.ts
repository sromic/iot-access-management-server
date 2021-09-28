import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

import { AbstractService } from '../services';

/**
 * Validate if givem query or param id exists in underlying storage
 * and throw @NotFoundException in case it doesn't
 */
export abstract class IdValidationPipe<ID, T, R>
  implements PipeTransform<ID, R>
{
  constructor(
    protected readonly service: AbstractService<ID, T>,
    protected readonly idIdentifiers: string[],
  ) {}

  /**
   *
   * @param value
   * @param metadata
   */
  abstract transform(value: ID, metadata: ArgumentMetadata): R;
}
