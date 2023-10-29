import { ApiProperty } from '@nestjs/swagger';

export class CreatePanalDiscussionDto {
  @ApiProperty({ nullable: true })
  startTime: string;

  @ApiProperty({ nullable: true })
  endTime: string;

  @ApiProperty({ nullable: true })
  sessionId: string;
}

export class UpdatePanalDiscussionDto {
  @ApiProperty({ nullable: true })
  startTime: string;

  @ApiProperty({ nullable: true })
  endTime: string;

  @ApiProperty({ nullable: true })
  sessionId: string;
}
