import { IsInt, IsUUID, Min } from 'class-validator';

export class SubmitScoreDto {
  @IsUUID() teamId: string;
  @IsInt() @Min(0) scoreA: number;
  @IsInt() @Min(0) scoreB: number;
}
