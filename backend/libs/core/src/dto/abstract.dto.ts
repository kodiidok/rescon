import { ApiProperty } from '@nestjs/swagger';

export class CreateAbstractDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  presenter: string;

  @ApiProperty({ required: true })
  abstractId: number;
}

export class UpdateAbstractDto {
  @ApiProperty({ nullable: true })
  title: string;

  @ApiProperty({ nullable: true })
  presenter: string;

  @ApiProperty({ nullable: true })
  abstractId: number;
}
