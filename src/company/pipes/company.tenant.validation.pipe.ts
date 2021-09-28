import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';

import { TenantIdValidationPipe } from '../../common/pipes';
import { TENANT_ID } from '../../common/utils';

import { CompanyService } from '../company.service';

@Injectable()
export class CompanyTenantValidationPipe extends TenantIdValidationPipe<
  string,
  Company
> {
  constructor(protected companyService: CompanyService) {
    super(companyService, [TENANT_ID]);
  }
}
