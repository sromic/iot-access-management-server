import { v4 as uuid } from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';

import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';
import { OperatorModule } from './operator.module';

import { CommonModule } from '../common/common.module';

describe('OperatorController', () => {
  let operatorController: OperatorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [OperatorModule, CommonModule],
      controllers: [OperatorController],
      providers: [OperatorService],
    }).compile();

    operatorController = app.get<OperatorController>(OperatorController);
  });

  describe('operator', () => {
    it('should create operator', () => {
      const createOperatorDto = {
        email: `${uuid()}@test.com`,
        firstName: `Test${Math.floor(Math.random() * 1000)}`,
        lastName: `Test${Math.floor(Math.random() * 1000)}`,
        phoneNumber: `${Math.floor(Math.random() * 1000)}`,
        userName: `${uuid()}`,
      };

      expect(operatorController.create(createOperatorDto)).toBeDefined();
    });
  });
});
