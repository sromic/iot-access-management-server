import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { AbstractService } from '../services';

/**
 * Validate if givem query or param or header id exists in underlying storage
 * and throw @NotFoundException in case it doesn't
 */
export class TenantIdValidationPipe<ID, T>
  implements PipeTransform<ID, Promise<ID>>
{
  constructor(
    protected readonly service: AbstractService<ID, T>,
    protected readonly tenantIdentifiers: string[],
  ) {}

  /**
   *
   * @param value
   * @param metadata
   * @returns
   */
  async transform(value: ID, metadata: ArgumentMetadata): Promise<ID> {
    if (this.tenantIdentifiers?.includes(metadata?.data) && value) {
      const entity = await this.service.getById(value);

      if (!entity) {
        throw new BadRequestException('Invalid tenant id provided');
      }
    }

    return value;
  }
}
