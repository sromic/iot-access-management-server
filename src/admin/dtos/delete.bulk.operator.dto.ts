import { PickType } from '@nestjs/mapped-types';

import { CreateBulkOperatorDto } from './create.bulk.operator.dto';

export class DeleteBulkOperatorDto extends PickType(CreateBulkOperatorDto, [
  'companyId',
  'operatorIds',
]) {}
