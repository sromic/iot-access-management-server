import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

import { TenantId } from '../../common/tenants/id.tenant';

export class OperatorAccessDto extends TenantId {
  @IsString()
  operatorId: string;

  @IsArray()
  @ArrayNotEmpty()
  tapChangerIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  roles: string[];
}
