import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            'roles',
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();

        const userRoles = await this.userService.userRoles(user.id);

        const hasRole = () =>
            userRoles.some((role) => requiredRoles.includes(role.code as Role));

        if (!hasRole()) {
            throw new ForbiddenException(
                'You do not have permission to access this resource'
            );
        }

        return true;
    }
}
