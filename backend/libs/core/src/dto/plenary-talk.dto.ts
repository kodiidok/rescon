import { ApiProperty } from '@nestjs/swagger';

export class CreatePlenaryTalkDto {
  @ApiProperty({ nullable: true })
  startTime: string;

  @ApiProperty({ nullable: true })
  endTime: string;

  @ApiProperty()
  presenter: string;

  @ApiProperty({ nullable: true })
  sessionId: string;

  @ApiProperty({ nullable: true })
  location: string;
}

export class UpdatePlenaryTalkDto {
  @ApiProperty({ nullable: true })
  startTime: string;

  @ApiProperty({ nullable: true })
  endTime: string;
  
  @ApiProperty({ nullable: true })
  presenter: string;

  @ApiProperty({ nullable: true })
  sessionId: string;

  @ApiProperty({ nullable: true })
  location: string;
}
