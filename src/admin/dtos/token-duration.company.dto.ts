import { IsPositive } from 'class-validator';

import { TenantId } from '../../common/tenants/id.tenant';

export class CreateTokenDurationCompanyDto extends TenantId {
  @IsPositive()
  duration: number;
}
