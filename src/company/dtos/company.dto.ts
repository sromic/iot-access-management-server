import { IsUUID } from 'class-validator';

export class CompanyDto {
  @IsUUID()
  id: string;
}
