import { UpdatePatchUserDto } from '../modules/user/dto/update-patch-user.dto';

export const updatePatchUserDto: UpdatePatchUserDto = {
    email: 'user@email.com.br',
    name: 'User Test',
    password: '123456',
    role: '1',
    tenantId: '1',
    birthAt: new Date('2003-12-21').toISOString(),
};
