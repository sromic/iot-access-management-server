import {
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { Company } from '@prisma/client';

import { IdValidationPipe } from '../../common/pipes';
import { GENERIC_ID_IDENTIFIER } from '../../common/utils';

import { CompanyService } from '../company.service';

/**
 * Validate if givem query or param id exists in underlying storage
 * and throw @NotFoundException in case it doesn't
 */
@Injectable()
export class CompanyIdValidationPipe extends IdValidationPipe<
  string,
  Company,
  Promise<string>
> {
  constructor(protected readonly service: CompanyService) {
    super(service, [GENERIC_ID_IDENTIFIER]);
  }

  /**
   *
   * @param value
   * @param metadata
   * @returns
   */
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (this.idIdentifiers?.includes(metadata?.data) && value) {
      const entity = await this.service.getById(value);

      if (!entity) {
        throw new NotFoundException('Resource not found');
      }
    }

    return value;
  }
}
