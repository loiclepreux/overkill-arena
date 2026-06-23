import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { TournamentFormat } from '@prisma/client';

export class CreateTournamentDto {
  @IsString() @MinLength(3) @MaxLength(60) name: string;
  @IsString() @MinLength(2) @MaxLength(60) game: string;
  @IsOptional() @IsEnum(TournamentFormat) format?: TournamentFormat;
  @IsInt() @Min(2) maxTeams: number;
  @IsOptional() @IsString() @MaxLength(1000) description?: string;
  @IsOptional() @IsString() startDate?: string;
  @IsOptional() @IsString() endDate?: string;
}
