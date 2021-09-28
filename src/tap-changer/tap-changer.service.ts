import { BadRequestException, Injectable } from '@nestjs/common';

import { Prisma, TapChanger } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractService } from '../common/services';

import { TapChangerRepository } from './tap-changer.repository';
import { isNonNullOrEmpty } from 'src/common/utils';

@Injectable()
export class TapChangerService extends AbstractService<string, TapChanger> {
  constructor(protected readonly repository: TapChangerRepository) {
    super(repository);
  }

  /**
   *
   * @param id
   * @returns
   */
  async getById(id: string): Promise<Maybe<TapChanger>> {
    return this.repository.getById(id);
  }

  /**
   *
   * @param input
   * @returns
   */
  async create(input: Prisma.TapChangerCreateInput): Promise<TapChanger> {
    return this.repository.create(input);
  }

  /**
   *
   * @param params
   * @returns
   */
  async update(params: {
    id: string;
    companyId: string;
    input: Prisma.TapChangerUpdateInput;
  }): Promise<TapChanger> {
    return this.repository.update(params);
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<TapChanger> {
    return this.repository.delete(id);
  }

  /**
   *
   * @param params
   * @returns
   */
  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TapChangerWhereUniqueInput;
    where?: Prisma.TapChangerWhereInput;
    orderBy?: Prisma.TapChangerOrderByWithRelationInput;
  }): Promise<TapChanger[]> {
    return this.repository.list(params);
  }

  /**
   *
   * @param params
   * @returns
   */
  async addTapChangersToCompany(params: {
    companyId: string;
    tapChangerIds: string[];
  }): Promise<Prisma.BatchPayload> {
    return this.repository.addTapChangersToCompany(params);
  }

  /**
   *
   * @param params
   * @returns
   */
  async removeTapChangersFromCompany(params: {
    companyId: string;
    tapChangerIds: string[];
  }): Promise<Prisma.BatchPayload> {
    return this.repository.removeTapChangersFromCompany(params);
  }

  /**
   *
   * @param params
   */
  async belongsToCompany(params: {
    id: string;
    companyId: string;
  }): Promise<boolean> {
    return this.repository.belongsToCompany(params);
  }

  /**
   *
   * @param params
   * @returns
   */
  async findMany(params: {
    ids: string[];
    companyId?: string;
  }): Promise<TapChanger[]> {
    return this.repository.findMany(params);
  }
}
