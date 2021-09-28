import { v4 as uuid } from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '../common/common.module';

import { CompanyModule } from '../company/company.module';
import { OperatorModule } from '../operator/operator.module';
import { TapChangerModule } from '../tap-changer/tap-changer.module';

import { AdminModule } from './admin.module';
import { AdminController } from './admin.controller';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AdminModule,
        CommonModule,
        CompanyModule,
        OperatorModule,
        TapChangerModule,
      ],
      controllers: [AdminController],
      providers: [],
    }).compile();

    controller = app.get<AdminController>(AdminController);
  });

  describe('company', () => {
    it('should create company', () => {
      const createCompanyDto = {
        name: uuid(),
      };

      expect(controller.createCompany(createCompanyDto)).toBeDefined();
    });
  });
});
