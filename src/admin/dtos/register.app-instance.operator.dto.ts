import { IsString } from 'class-validator';

import { TenantId } from '../../common/tenants/id.tenant';

export class RegisterAppInstanceOperatorDto extends TenantId {
  @IsString()
  takId: string;

  @IsString()
  operatorId: string;
}
