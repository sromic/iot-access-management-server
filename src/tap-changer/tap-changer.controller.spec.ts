import { v4 as uuid } from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';

import { TapChangerController } from './tap-changer.controller';
import { TapChangerService } from './tap-changer.service';
import { TapChangerModule } from './tap-changer.module';

import { CommonModule } from '../common/common.module';

describe('TapChangerController', () => {
  let tapChangerController: TapChangerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TapChangerModule, CommonModule],
      controllers: [TapChangerController],
      providers: [TapChangerService],
    }).compile();

    tapChangerController = app.get<TapChangerController>(TapChangerController);
  });

  describe('tap changer', () => {
    it('should create tap changer', () => {
      const createTapChangerDto = {
        id: `${uuid()}`,
        serialNumber: `${uuid()}`,
        gpsLocation: '41,40338-2,17403',
      };
      expect(tapChangerController.create(createTapChangerDto)).toBeDefined();
    });
  });
});
