import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDto: CreateUserDTO = {
    email: 'user@email.com.br',
    name: 'User Test',
    password: '123456',
    role: Role.User,
    birthAt: new Date('2003-12-21').toISOString(),
};
