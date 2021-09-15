import { PartialType } from '@nestjs/mapped-types';

import { CreateOperatorDto } from '.';

export class UpdateOperatorDto extends PartialType(CreateOperatorDto) {}
