import { IsArray, ArrayNotEmpty } from 'class-validator';

import { TenantId } from '../../common/tenants/id.tenant';

export class CreateBulkTapChangerDto extends TenantId {
  @IsArray()
  @ArrayNotEmpty()
  tapChangerIds: string[];
}
