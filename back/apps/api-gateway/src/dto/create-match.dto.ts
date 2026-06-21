import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { MatchFormat } from '@prisma/client';

export class CreateMatchDto {
  @IsOptional() @IsUUID() tournamentId?: string;
  @IsUUID() teamAId: string;
  @IsUUID() teamBId: string;
  @IsOptional() @IsEnum(MatchFormat) format?: MatchFormat;
  @IsOptional() @IsString() scheduledAt?: string;
}
