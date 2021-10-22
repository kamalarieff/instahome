import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import type { Offers, Company } from '@instahome/types';
import { AppService } from './app.service';

@Controller({ version: '1', path: 'companies' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCompanies(): Company[] {
    return this.appService.getCompanies();
  }

  @Get(':id')
  getCompanyOffer(@Param('id', ParseIntPipe) id: number): Offers[] {
    const companyOffers = this.appService.getCompanyOffers();
    const offerData = companyOffers[id] ?? [];
    return offerData;
  }
}
