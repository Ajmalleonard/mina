import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      where: { isActive: true },
    });
  }

  async findOne(slug: string) {
    return this.prisma.activity.findUnique({
      where: { slug },
    });
  }

  async create(data: any) {
    return this.prisma.activity.create({
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.activity.delete({
      where: { id },
    });
  }
}
