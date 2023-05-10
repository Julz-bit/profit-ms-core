import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.prisma.project.create({
      data: createProjectDto
    });
  }

  async findAll() {
    return await this.prisma.project.findMany();
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findFirst({
      where: { id: id }
    });

    if (!project) throw new NotFoundException(`project not found!`);

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.prisma.project.findFirst({
      where: { id: id }
    });

    if (!project) throw new NotFoundException(`project not found!`);

    return await this.prisma.project.update({
      where: { id: id },
      data: updateProjectDto
    });
  }

  async remove(id: number) {
    const project = await this.prisma.project.findFirst({
      where: { id: id }
    });

    if (!project) throw new NotFoundException(`project not found!`);

    return await this.prisma.project.delete({
      where: { id: id }
    })
  }
}
