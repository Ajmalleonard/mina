import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.activitiesService.findOne(slug);
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.activitiesService.create(createDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}
