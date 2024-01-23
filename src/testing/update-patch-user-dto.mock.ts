import { Role } from '../enums/role.enum';
import { UpdatePatchUserDto } from '../user/dto/update-patch-user.dto';

export const updatePatchUserDto: UpdatePatchUserDto = {
    email: 'user@email.com.br',
    name: 'User Test',
    password: '123456',
    role: Role.User,
    birthAt: new Date('2003-12-21').toISOString(),
};
