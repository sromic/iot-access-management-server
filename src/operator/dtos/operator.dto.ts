import { IsEmail, IsString, IsUUID } from 'class-validator';

export class OperatorDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  userName: string;
}
