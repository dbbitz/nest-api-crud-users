import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
    constructor(private readonly prisma: PrismaService) {}

    async list() {
        return this.prisma.role.findMany();
    }
}
