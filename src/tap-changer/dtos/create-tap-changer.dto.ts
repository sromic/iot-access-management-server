import { IsString } from 'class-validator';

export class CreateTapChangerDto {
  @IsString()
  id: string;

  @IsString()
  serialNumber: string;

  @IsString()
  gpsLocation: string;
}
