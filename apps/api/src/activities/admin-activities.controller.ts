import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../../prisma/generated/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('admin/activities')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get('meta')
  async getMeta() {
    return this.activitiesService.getAdminMeta();
  }

  @Get()
  async findAll() {
    return this.activitiesService.findAllAdmin();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.activitiesService.findById(id);
  }

  @Post()
  async create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}
