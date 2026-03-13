import { Controller, Get, Logger } from '@nestjs/common';
import { DonationsService } from './donations.service';

@Controller('donations')
export class DonationsController {
  private readonly logger = new Logger(DonationsController.name);

  constructor(private readonly donationsService: DonationsService) {}

  /**
   * GET /donations
   * Returns all recorded donations.
   */
  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  /**
   * GET /donations/stats
   * Returns aggregated donation statistics.
   */
  @Get('stats')
  getStats() {
    return this.donationsService.getStats();
  }
}
