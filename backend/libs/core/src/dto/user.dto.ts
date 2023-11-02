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

  @ApiProperty({ nullable: true })
  nic?: string;
  
  @ApiProperty({ nullable: true })
  presentingSessionIds?: string[];

  @ApiProperty({ nullable: true })
  institute?: string;

  @ApiProperty({ nullable: true, default: false })
  registered?: boolean;
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

  @ApiProperty({ nullable: true })
  nic?: string;
  
  @ApiProperty({ nullable: true })
  presentingSessionIds?: string[];

  @ApiProperty({ nullable: true })
  institute?: string;

  @ApiProperty({ nullable: true })
  registered?: boolean;
}
