// user.mock.ts

import { User } from '@prisma/client';

export const userEntityList: User[] = [
    {
        id: '1',
        name: 'User Test',
        email: 'user@test.com',
        password:
            '$2b$10$yqeOFUreO7hclwVrJDECK.b0Afy5T4qlkmnU5IxPsuODud7GC6Gcu',
        tenantId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
