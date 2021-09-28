import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { TENANT_ID } from '../../common/utils';

import { CompanyService } from '../../company/company.service';

/**
 * Validate if givem company id exists in underlying storage
 * and throw @BadRequestException in case it doesn't
 */
@Injectable()
export class CompanyIdValidationInterceptor implements NestInterceptor {
  constructor(private readonly service: CompanyService) {}

  /**
   *
   * @param context
   * @param next
   * @returns
   */
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const { body } = context.switchToHttp().getRequest();

    if (body && body[TENANT_ID]) {
      const id = body[TENANT_ID];

      const tenant = await this.service.getById(id);

      if (!tenant) {
        throw new BadRequestException(`Invalid company provided`);
      }
    }

    return next.handle();
  }
}
