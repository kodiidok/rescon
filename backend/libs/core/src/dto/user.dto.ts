import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../enums/user-roles.enum';

export class CreateUserDto {
  @ApiProperty({ required: true, default: 'user' })
  username?: string;

  @ApiProperty({ required: true, default: 'default@email.com' })
  email?: string;

  @ApiProperty({ required: true, default: 'P@ssw0rd' })
  password!: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  roleName?: UserRoles;

  @ApiProperty({ nullable: true })
  chairingSessionIds?: string[];
}

export class UpdateUserDto {
  @ApiProperty({ nullable: true })
  username?: string;

  @ApiProperty({ nullable: true })
  email?: string;

  @ApiProperty({ nullable: true })
  password!: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  roleName?: UserRoles;

  @ApiProperty({ nullable: true })
  chairingSessionIds?: string[];
}
