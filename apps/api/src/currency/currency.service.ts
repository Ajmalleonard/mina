import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {
  getRates() {
    return {
      base: 'EUR',
      rates: {
        EUR: 1.0,
        USD: 1.08,
      },
    };
  }
}
