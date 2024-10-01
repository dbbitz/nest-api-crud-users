import { CreateUserDTO } from '../modules/user/dto/create-user.dto';

export const createUserDto: CreateUserDTO = {
  email: 'user@email.com.br',
  name: 'User Test',
  password: '123456',
  roleId: '1',
  tenantId: '1',
  birthAt: new Date('2003-12-21').toISOString(),
};
