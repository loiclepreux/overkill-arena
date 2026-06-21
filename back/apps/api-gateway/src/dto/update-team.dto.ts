import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTeamDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(30) name?: string;
  @IsOptional() @IsString() @MinLength(2) @MaxLength(6) tag?: string;
  @IsOptional() @IsString() @MaxLength(2000) logo?: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
}
