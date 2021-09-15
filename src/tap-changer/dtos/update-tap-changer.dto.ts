import { PartialType } from '@nestjs/mapped-types';

import { CreateTapChangerDto } from '.';

export class UpdateTapChangerDto extends PartialType(CreateTapChangerDto) {}
