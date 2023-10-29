import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class CreateSessionDto {
  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  sessionId: string;

  @ApiProperty({ nullable: true })
  sessionItemIds: string[];

  @ApiProperty({ nullable: true })
  sessionChairIds: string[];

  @ApiProperty()
  category: string;

  @ApiProperty()
  location: string;
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
  sessionItemIds: string[];

  @ApiProperty({ nullable: true })
  sessionChairIds: string[];

  @ApiProperty({ nullable: true })
  category: string;

  @ApiProperty({ nullable: true })
  location: string;

  @ApiProperty({nullable: true})
  panalDiscussionIds: string[];
}

export class ResponseDto {
  @ApiProperty({ nullable: true })
  startTime: string;

  @ApiProperty({ nullable: true })
  endTime: string;

  @ApiProperty({ nullable: true })
  date: string;

  @ApiProperty({ nullable: true })
  sessionId: string;

  @ApiProperty({ nullable: true })
  sessionItemIds: string[];

  @ApiProperty({ nullable: true })
  category: string;

  @ApiProperty({ nullable: true })
  location: string;

  @ApiProperty({nullable: true})
  sessionChairs: UserEntity[];
}