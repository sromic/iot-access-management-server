import { IsArray, ArrayNotEmpty } from 'class-validator';

import { TenantId } from '../../common/tenants/id.tenant';

export class CreateBulkOperatorDto extends TenantId {
  @IsArray()
  @ArrayNotEmpty()
  operatorIds: string[];
}
