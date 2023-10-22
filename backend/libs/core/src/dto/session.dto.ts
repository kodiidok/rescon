import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  sessionChairs: string[];

  @ApiProperty()
  sessionItemIds: string[];

  @ApiProperty()
  category: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  discussionStartTime: string;

  @ApiProperty()
  discussionEndTime: string;
}

export class UpdateSessionDto {
  @ApiProperty({ nullable: true })
  startTime: string;

  @ApiProperty({ nullable: true })
  endTime: string;

  @ApiProperty({ nullable: true })
  date: string;

  @ApiProperty({ nullable: true })
  sessionId: string;

  @ApiProperty({ nullable: true })
  sessionChairs: string[];

  @ApiProperty({ nullable: true })
  sessionItemIds: string[];

  @ApiProperty({ nullable: true })
  category: string;

  @ApiProperty({ nullable: true })
  location: string;

  @ApiProperty({ nullable: true })
  discussionStartTime: string;

  @ApiProperty({ nullable: true })
  discussionEndTime: string;
}
