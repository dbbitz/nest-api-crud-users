import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDTO) {
        try {
            const salt = await bcrypt.genSalt();

            data.password = await bcrypt.hash(data.password, salt);

            const user = await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    tenantId: data.tenantId,
                    roles: {
                        connect: {
                            code: 'user',
                        },
                    },
                    userRoles: {
                        create: {
                            role: {
                                connect: { code: 'user' },
                            },
                        },
                    },
                },
            });

            return user;
        } catch (error) {
            console.log(`Error creating user: ${error}`, error.stack);

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new Error('Failed to create user');
        }
    }

    async list() {
        return this.prisma.user.findMany();
    }

    async show(id: string) {
        await this.exists(id);
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async update(
        id: string,
        { email, name, password, role }: UpdatePutUserDto
    ) {
        return this.prisma.user.update({
            where: { id },
            data: {
                email,
                name,
                password,
                roles: {
                    connect: { id: role },
                },
            },
        });
    }

    async updatePartial(
        id: string,
        { email, name, password, birthAt, role }: UpdatePatchUserDto
    ) {
        const data: any = {};
        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }
        if (email) data.email = email;
        if (name) data.name = name;
        if (password) data.password = password;
        if (role) data.roles = { connect: { id: role } };

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        await this.prisma.user.delete({
            where: { id },
        });
        return true;
    }

    async exists(id: string) {
        if (
            !(await this.prisma.user.count({
                where: { id },
            }))
        ) {
            throw new NotFoundException(`O usuário ${id} não existe!`);
        }
    }

    async userRoles(id: string) {
        const roles = await this.prisma.role.findMany({
            where: {
                users: {
                    some: {
                        id,
                    },
                },
            },
        });

        return roles;
    }
}
