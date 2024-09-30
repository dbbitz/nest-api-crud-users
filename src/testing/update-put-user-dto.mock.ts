import { Role } from '../enums/role.enum';
import { UpdatePutUserDto } from '../modules/user/dto/update-put-user.dto';

export const updatePutUserDto: UpdatePutUserDto = {
    email: 'user@email.com.br',
    name: 'User Test',
    password: '123456',
    role: Role.User,
    birthAt: new Date('2003-12-21').toISOString(),
};
