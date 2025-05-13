import { SetMetadata } from '@nestjs/common';
import { Role } from './enums/roles.enum';
import { UserRole } from 'src/resource/users/entities/user.entity';


export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);