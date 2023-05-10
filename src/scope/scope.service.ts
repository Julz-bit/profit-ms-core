import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { PrismaService } from '../prisma.service';
import { Scope } from '@prisma/client';

@Injectable()
export class ScopeService {
  constructor(private prisma: PrismaService) { }

  async create(createScopeDto: CreateScopeDto): Promise<object> {
    const scopes = createScopeDto.scopes;
    let success = 0;
    let failed = 0;

    for (let i = 0; i < scopes.length; i++) {
      const { startDate, endDate, ...rest } = scopes[i];

      const transaction = await this.prisma.scope.create({
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          project: {
            connect: { id: createScopeDto.projectId }
          }
        }
      });

      transaction ? success += 1 : failed += 1;
    }

    return { success: success, failed: failed };
  }

  async findAll(id: number): Promise<Scope[]> {
    return await this.prisma.scope.findMany({
      where: {
        projectId: id
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async findOne(id: number): Promise<Scope> {
    const scope = await this.prisma.scope.findFirst({
      where: { id: id }
    });

    if (!scope) throw new NotFoundException('scope not found!');

    return scope;
  }

  async update(id: number, updateScopeDto: UpdateScopeDto): Promise<Scope> {
    const scope = await this.prisma.scope.findFirst({
      where: { id: id }
    });

    if (!scope) throw new NotFoundException('scope not found!');

    const { startDate, endDate, ...rest } = updateScopeDto;

    return await this.prisma.scope.update({
      where: { id: id },
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    })
  }

  async remove(id: number) {
    const scope = await this.prisma.scope.findFirst({
      where: { id: id }
    });

    if (!scope) throw new NotFoundException('scope not found!');

    return await this.prisma.scope.delete({
      where: { id: id }
    })
  }
}
