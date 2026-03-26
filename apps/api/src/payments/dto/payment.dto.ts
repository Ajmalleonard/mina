import { IsString, IsNumber, IsOptional, IsBoolean, IsEmail, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePesapalOrderDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Minimum donation is $1' })
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsBoolean()
  isMonthly?: boolean;
}
