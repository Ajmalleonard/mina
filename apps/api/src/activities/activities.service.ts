import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivityCategory, ActivityType, Prisma } from '../../prisma/generated/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.activity.findMany({
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
      where: { isActive: true },
    });
  }

  async findAllAdmin() {
    return this.prisma.activity.findMany({
      orderBy: [{ priority: 'asc' }, { updatedAt: 'desc' }],
    });
  }

  async getAdminMeta() {
    const activityRows = await this.prisma.activity.findMany({
      select: {
        category: true,
        type: true,
        isActive: true,
      },
    });

    const categoryCountMap = new Map<ActivityCategory, number>();
    const typeCountMap = new Map<ActivityType, number>();
    let activeCount = 0;

    for (const activity of activityRows) {
      categoryCountMap.set(
        activity.category,
        (categoryCountMap.get(activity.category) || 0) + 1,
      );
      typeCountMap.set(activity.type, (typeCountMap.get(activity.type) || 0) + 1);

      if (activity.isActive) {
        activeCount += 1;
      }
    }

    const totalCount = activityRows.length;

    return {
      totals: {
        total: totalCount,
        active: activeCount,
        inactive: totalCount - activeCount,
      },
      categories: Object.values(ActivityCategory).map((value) => ({
        value,
        count: categoryCountMap.get(value) || 0,
      })),
      types: Object.values(ActivityType).map((value) => ({
        value,
        count: typeCountMap.get(value) || 0,
      })),
    };
  }

  async findBySlug(slug: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { slug },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found.');
    }

    return activity;
  }

  async findById(id: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found.');
    }

    return activity;
  }

  async create(createActivityDto: CreateActivityDto) {
    return this.prisma.activity.create({
      data: this.buildCreateData(createActivityDto),
    });
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    await this.findById(id);

    return this.prisma.activity.update({
      where: { id },
      data: this.buildUpdateData(updateActivityDto),
    });
  }

  async remove(id: string) {
    await this.findById(id);

    return this.prisma.activity.delete({
      where: { id },
    });
  }

  private buildCreateData(createActivityDto: CreateActivityDto): Prisma.ActivityCreateInput {
    const title = createActivityDto.title.trim();
    const slugSource = createActivityDto.slug?.trim() || title;

    return {
      title,
      slug: slugify(slugSource),
      description: createActivityDto.description.trim(),
      image: createActivityDto.image,
      goalAmount: createActivityDto.goalAmount ?? null,
      raisedAmount: createActivityDto.raisedAmount ?? 0,
      isActive: createActivityDto.isActive ?? true,
      category: createActivityDto.category ?? ActivityCategory.GENERAL_HELPS,
      priority: createActivityDto.priority ?? 0,
      type: createActivityDto.type ?? ActivityType.DONATION,
      price: createActivityDto.price ?? null,
    };
  }

  private buildUpdateData(updateActivityDto: UpdateActivityDto): Prisma.ActivityUpdateInput {
    const data: Prisma.ActivityUpdateInput = {};

    if (updateActivityDto.title !== undefined) {
      data.title = updateActivityDto.title.trim();
    }

    if (updateActivityDto.slug !== undefined || updateActivityDto.title !== undefined) {
      const slugSource = updateActivityDto.slug?.trim() || updateActivityDto.title?.trim();
      if (slugSource) {
        data.slug = slugify(slugSource);
      }
    }

    if (updateActivityDto.description !== undefined) {
      data.description = updateActivityDto.description.trim();
    }

    if (updateActivityDto.image !== undefined) {
      data.image = updateActivityDto.image;
    }

    if (updateActivityDto.goalAmount !== undefined) {
      data.goalAmount = updateActivityDto.goalAmount ?? null;
    }

    if (updateActivityDto.raisedAmount !== undefined) {
      data.raisedAmount = updateActivityDto.raisedAmount;
    }

    if (updateActivityDto.isActive !== undefined) {
      data.isActive = updateActivityDto.isActive;
    }

    if (updateActivityDto.category !== undefined) {
      data.category = updateActivityDto.category;
    }

    if (updateActivityDto.priority !== undefined) {
      data.priority = updateActivityDto.priority;
    }

    if (updateActivityDto.type !== undefined) {
      data.type = updateActivityDto.type;
    }

    if (updateActivityDto.price !== undefined) {
      data.price = updateActivityDto.price ?? null;
    }

    return data;
  }
}
