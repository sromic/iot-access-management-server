import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';

import { AbstractService } from '../services';
import { ENTITY_ID } from '../types';

/**
 * Validate if givem query or param id exists in underlying storage
 * and throw @NotFoundException in case it doesn't
 */
export abstract class ResourceIdTenantValidationInterceptor<T>
  implements NestInterceptor
{
  constructor(
    protected readonly service: AbstractService<ENTITY_ID, T>,
    protected readonly idIdentifiers: string[],
    protected readonly tenantIdentifiers: string[],
    protected readonly reflector: Reflector,
  ) {}

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
    const { headers, params } = context.switchToHttp().getRequest();

    if (!headers) {
      throw new BadRequestException();
    }

    const tenantIdKey = this.tenantIdentifiers.find(
      (tenanIdKey) => headers[tenanIdKey],
    );

    const tenantId = tenantIdKey ? headers[tenantIdKey] : undefined;

    if (!tenantIdKey) {
      throw new BadRequestException('Tenant id not provided');
    }

    if (params) {
      const paramIdKey = this.idIdentifiers.find((idKey) => params[idKey]);

      if (paramIdKey) {
        const paramId = params[paramIdKey];

        const entity = await this.service.getById({
          id: paramId,
          companyId: tenantId,
        });

        if (!entity) {
          throw new NotFoundException('Resource not found');
        }
      }
    }

    return next.handle();
  }
}
