import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../enums/user-roles.enum';

export class CreateRoleDto {
  @ApiProperty({ required: true })
  name?: UserRoles;
}

export class UpdateRoleDto {
  @ApiProperty({ nullable: true })
  name?: UserRoles;
}
