import { IsNotEmpty, Matches } from 'class-validator';

export class VerifyAdminMfaDto {
  @IsNotEmpty()
  challengeToken: string;

  @Matches(/^\d{6}$/)
  code: string;
}
