import { PickType } from '@nestjs/mapped-types';

import { CreateBulkTapChangerDto } from './create.bulk.tap-changer.dto';

export class DeleteBulkTapChangerDto extends PickType(CreateBulkTapChangerDto, [
  'companyId',
  'tapChangerIds',
]) {}
