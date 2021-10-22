import { Injectable } from '@nestjs/common';
import type { Offers, Company } from '@instahome/types';

@Injectable()
export class AppService {
  companies = [
    { id: 1, name: 'uem sunrise' },
    { id: 2, name: 'sime darby' },
    { id: 3, name: 'igb berhad' },
    { id: 4, name: 'mah sing group' },
    { id: 5, name: 'yoghirt' },
  ];

  companyOffers: { [key: number]: Offers[] } = {
    1: [
      {
        adId: 'standard',
        type: 'xfory',
        eligibleLimit: 3,
        reduceCountBy: 1,
      },
    ],
    2: [
      {
        adId: 'featured',
        type: 'discount',
        newPrice: 299.99,
      },
    ],
    3: [
      {
        adId: 'premium',
        type: 'discountconditional',
        eligibleLimit: 4,
        newPrice: 379.99,
      },
    ],
    4: [
      {
        adId: 'standard',
        type: 'xfory',
        eligibleLimit: 3,
        reduceCountBy: 1,
      },
      {
        adId: 'featured',
        type: 'discount',
        newPrice: 299.99,
      },
      {
        adId: 'premium',
        type: 'discountconditional',
        eligibleLimit: 3,
        newPrice: 379.99,
      },
    ],
  };

  getCompanies(): Company[] {
    return this.companies;
  }

  getCompanyOffers(): { [key: number]: Offers[] } {
    return this.companyOffers;
  }
}
