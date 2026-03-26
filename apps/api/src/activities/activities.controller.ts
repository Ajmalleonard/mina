import { Controller, Get, Param } from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async findAll() {
    return this.activitiesService.findAllPublic();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.activitiesService.findBySlug(slug);
  }
}
