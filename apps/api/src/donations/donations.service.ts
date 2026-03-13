import { Injectable, Logger } from '@nestjs/common';

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  donorEmail: string;
  donorName: string;
  paymentMethod: 'stripe' | 'pesapal' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed';
  isMonthly: boolean;
  trackingId?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class DonationsService {
  private readonly logger = new Logger(DonationsService.name);
  private donations: Donation[] = [];

  /**
   * Record a new donation.
   */
  create(data: Partial<Donation>): Donation {
    const donation: Donation = {
      id: `don_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      amount: data.amount || 0,
      currency: data.currency || 'USD',
      donorEmail: data.donorEmail || '',
      donorName: data.donorName || '',
      paymentMethod: data.paymentMethod || 'pesapal',
      status: data.status || 'pending',
      isMonthly: data.isMonthly || false,
      trackingId: data.trackingId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.donations.push(donation);
    this.logger.log(`Donation ${donation.id} created: $${donation.amount}`);
    return donation;
  }

  /**
   * Get all donations.
   */
  findAll(): Donation[] {
    return this.donations;
  }

  /**
   * Update donation status by tracking ID.
   */
  updateByTrackingId(trackingId: string, status: Donation['status']): Donation | null {
    const donation = this.donations.find((d) => d.trackingId === trackingId);
    if (donation) {
      donation.status = status;
      donation.updatedAt = new Date();
      this.logger.log(`Donation ${donation.id} updated to ${status}`);
    }
    return donation || null;
  }

  /**
   * Get donation stats.
   */
  getStats() {
    const total = this.donations.filter((d) => d.status === 'completed').length;
    const totalAmount = this.donations
      .filter((d) => d.status === 'completed')
      .reduce((sum, d) => sum + d.amount, 0);
    return { totalDonations: total, totalAmount };
  }
}
