import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
