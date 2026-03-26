import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../../prisma/generated/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionsService } from './promotions.service';

@Controller('admin/promotions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  async findAll() {
    return this.promotionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.promotionsService.findOne(id);
  }

  @Post()
  async create(@Request() req, @Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionsService.create(req.user.userId, createPromotionDto);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionsService.update(id, req.user.userId, updatePromotionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.promotionsService.remove(id);
  }
}
