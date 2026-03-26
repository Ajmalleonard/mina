import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../prisma/generated/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toDateOrNull(value?: string) {
  if (!value) {
    return null;
  }

  return new Date(value);
}

@Injectable()
export class PromotionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.promotion.findMany({
      orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { updatedAt: 'desc' }],
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const promotion = await this.prisma.promotion.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!promotion) {
      throw new NotFoundException('Promotion not found.');
    }

    return promotion;
  }

  async create(adminId: string, createPromotionDto: CreatePromotionDto) {
    return this.prisma.promotion.create({
      data: this.buildCreateData(createPromotionDto, adminId),
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async update(id: string, adminId: string, updatePromotionDto: UpdatePromotionDto) {
    await this.findOne(id);

    return this.prisma.promotion.update({
      where: { id },
      data: this.buildUpdateData(updatePromotionDto, adminId),
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.promotion.delete({
      where: { id },
    });
  }

  private buildCreateData(createPromotionDto: CreatePromotionDto, adminId: string): Prisma.PromotionCreateInput {
    const slug = slugify(createPromotionDto.slug || createPromotionDto.title);

    return {
      title: createPromotionDto.title.trim(),
      slug,
      summary: createPromotionDto.summary.trim(),
      description: createPromotionDto.description?.trim() || null,
      imageUrl: createPromotionDto.imageUrl || null,
      ctaLabel: createPromotionDto.ctaLabel?.trim() || null,
      ctaHref: createPromotionDto.ctaHref || null,
      status: createPromotionDto.status || 'DRAFT',
      featured: createPromotionDto.featured ?? false,
      sortOrder: createPromotionDto.sortOrder ?? 0,
      startsAt: toDateOrNull(createPromotionDto.startsAt),
      endsAt: toDateOrNull(createPromotionDto.endsAt),
      createdBy: {
        connect: {
          id: adminId,
        },
      },
      updatedBy: {
        connect: {
          id: adminId,
        },
      },
    };
  }

  private buildUpdateData(updatePromotionDto: UpdatePromotionDto, adminId: string): Prisma.PromotionUpdateInput {
    const data: Prisma.PromotionUpdateInput = {
      updatedBy: {
        connect: {
          id: adminId,
        },
      },
    };

    if (updatePromotionDto.title !== undefined) {
      data.title = updatePromotionDto.title.trim();
    }

    if (updatePromotionDto.slug !== undefined || updatePromotionDto.title !== undefined) {
      data.slug = slugify(updatePromotionDto.slug || updatePromotionDto.title || '');
    }

    if (updatePromotionDto.summary !== undefined) {
      data.summary = updatePromotionDto.summary.trim();
    }

    if (updatePromotionDto.description !== undefined) {
      data.description = updatePromotionDto.description?.trim() || null;
    }

    if (updatePromotionDto.imageUrl !== undefined) {
      data.imageUrl = updatePromotionDto.imageUrl || null;
    }

    if (updatePromotionDto.ctaLabel !== undefined) {
      data.ctaLabel = updatePromotionDto.ctaLabel?.trim() || null;
    }

    if (updatePromotionDto.ctaHref !== undefined) {
      data.ctaHref = updatePromotionDto.ctaHref || null;
    }

    if (updatePromotionDto.status !== undefined) {
      data.status = updatePromotionDto.status;
    }

    if (updatePromotionDto.featured !== undefined) {
      data.featured = updatePromotionDto.featured;
    }

    if (updatePromotionDto.sortOrder !== undefined) {
      data.sortOrder = updatePromotionDto.sortOrder;
    }

    if (updatePromotionDto.startsAt !== undefined) {
      data.startsAt = toDateOrNull(updatePromotionDto.startsAt);
    }

    if (updatePromotionDto.endsAt !== undefined) {
      data.endsAt = toDateOrNull(updatePromotionDto.endsAt);
    }

    return data;
  }
}
