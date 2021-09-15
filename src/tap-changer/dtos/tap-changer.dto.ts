import { IsString } from 'class-validator';

export class TapChangerDto {
  @IsString()
  id: string;

  @IsString()
  serialNumber: string;

  @IsString()
  gpsLocation: string;
}
