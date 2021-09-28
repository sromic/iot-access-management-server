import { IsUUID } from 'class-validator';

export class TenantId {
  @IsUUID()
  companyId: string;
}
