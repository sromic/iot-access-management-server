import { Injectable } from '@nestjs/common';

import { AppInstance } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractService } from '../common/services';

import { AppInstanceRepository } from './app-instance.repository';

@Injectable()
export class AppInstanceService extends AbstractService<string, AppInstance> {
  constructor(protected readonly repository: AppInstanceRepository) {
    super(repository);
  }

  /**
   *
   * @param takId
   */
  async getById(takId: string): Promise<Maybe<AppInstance>> {
    return this.repository.getById(takId);
  }

  /**
   *
   * @param params
   * @returns
   */
  async create(params: {
    takId: string;
    companyId: string;
    operatorId: string;
  }): Promise<AppInstance> {
    return this.repository.create(params);
  }
}
