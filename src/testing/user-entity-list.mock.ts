// user.mock.ts

import { User } from '@prisma/client';
import { Role } from '../enums/role.enum';

export const userEntityList: User[] = [
    {
        id: '1',
        name: 'User Test',
        email: 'user@test.com',
        password:
            '$2b$10$yqeOFUreO7hclwVrJDECK.b0Afy5T4qlkmnU5IxPsuODud7GC6Gcu',
        birthAt: new Date('2003-12-12'),
        role: Role.Admin,
        createdAt: new Date(),
        updatedAt: new Date(),
        tenantId: '1',
    },
];
