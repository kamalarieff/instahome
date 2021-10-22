import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import type { Offers } from '@instahome/types';

describe('AppController', () => {
  let app: TestingModule;
  let appService: AppService;
  let expectedGetCompanies = [{ id: 1, name: 'fake company' }];
  let expectedGetCompanyOffers: { [key: number]: Offers[] } = {
    1: [{ adId: 'featured', type: 'discount', newPrice: 1 }],
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appService = app.get<AppService>(AppService);
    jest
      .spyOn(appService, 'getCompanies')
      .mockImplementation(() => expectedGetCompanies);
    jest
      .spyOn(appService, 'getCompanyOffers')
      .mockImplementation(() => expectedGetCompanyOffers);
  });

  describe('getCompanies', () => {
    it('should return list of companies', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getCompanies()).toBe(expectedGetCompanies);
    });
  });

  describe('getCompanyOffer', () => {
    it('should return company offer', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getCompanyOffer(1)).toStrictEqual([
        { adId: 'featured', type: 'discount', newPrice: 1 },
      ]);
    });

    it('should return company offer when id is not found', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getCompanyOffer(10)).toStrictEqual([]);
    });
  });
});
