import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { MedalRank, RewardType } from '@prisma/client';

export class AwardRewardDto {
  @IsUUID() userId: string;
  @IsEnum(RewardType) type: RewardType;
  @IsOptional() @IsEnum(MedalRank) medalRank?: MedalRank;
  @IsOptional() @IsString() @MaxLength(60) cupName?: string;
  @IsOptional() @IsString() @MaxLength(60) titleName?: string;
  @IsOptional() @IsString() @MaxLength(200) description?: string;
  @IsOptional() @IsUUID() tournamentId?: string;
  @IsOptional() @IsUUID() matchId?: string;
}
