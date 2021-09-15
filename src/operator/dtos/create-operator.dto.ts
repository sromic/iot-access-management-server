import { IsEmail, IsString } from 'class-validator';

export class CreateOperatorDto {
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
