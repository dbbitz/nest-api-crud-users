import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDTO) {
        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password, salt);

        return this.prisma.user.create({
            data,
        });
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
        { email, name, password, roleId }: UpdatePutUserDto
    ) {
        return this.prisma.user.update({
            where: { id },
            data: {
                email,
                name,
                password,
                roles: {
                    connect: { id: roleId },
                },
            },
        });
    }

    async updatePartial(
        id: string,
        { email, name, password, birthAt, roleId }: UpdatePatchUserDto
    ) {
        const data: any = {};
        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }
        if (email) data.email = email;
        if (name) data.name = name;
        if (password) data.password = password;
        if (roleId) data.roles = { connect: { id: roleId } };

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
