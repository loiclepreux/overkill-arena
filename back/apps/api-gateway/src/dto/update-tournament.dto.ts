import { IsEnum, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { TournamentFormat, TournamentStatus } from '@prisma/client';

export class UpdateTournamentDto {
  @IsOptional() @IsString() @MinLength(3) @MaxLength(60) name?: string;
  @IsOptional() @IsString() @MinLength(2) @MaxLength(60) game?: string;
  @IsOptional() @IsEnum(TournamentFormat) format?: TournamentFormat;
  @IsOptional() @IsInt() @Min(2) maxTeams?: number;
  @IsOptional() @IsString() @MaxLength(1000) description?: string;
  @IsOptional() @IsString() startDate?: string;
  @IsOptional() @IsString() endDate?: string;
}

export class UpdateTournamentStatusDto {
  @IsEnum(TournamentStatus) status: TournamentStatus;
}
