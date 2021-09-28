import { Injectable } from '@nestjs/common';
import { Operator, Prisma } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractService } from '../common/services';

import { OperatorRepository } from './operator.repository';
import { CompleteOperator } from './types/operator.type';

@Injectable()
export class OperatorService extends AbstractService<string, Operator> {
  constructor(protected readonly repository: OperatorRepository) {
    super(repository);
  }

  /**
   *
   * @param id
   * @returns
   */
  async getById(id: string): Promise<Maybe<Operator>> {
    return this.repository.getById(id);
  }

  /**
   *
   * @param id
   * @returns
   */
  async getCompleteById(id: string): Promise<Maybe<CompleteOperator>> {
    return this.repository.getCompleteById(id);
  }

  /**
   *
   * @returns
   */
  async create(input: Prisma.OperatorCreateInput): Promise<Operator> {
    return this.repository.create(input);
  }

  /**
   *
   * @param params
   */
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   *
   * @param params
   * @returns
   */
  async update(params: {
    id: string;
    input: Prisma.OperatorUpdateInput;
  }): Promise<Operator> {
    return this.repository.update(params);
  }

  /**
   *
   * @param params
   * @returns
   */
  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OperatorWhereUniqueInput;
    where?: Prisma.OperatorWhereInput;
    orderBy?: Prisma.OperatorOrderByWithRelationInput;
  }): Promise<Operator[]> {
    return this.repository.list(params);
  }

  /**
   *
   * @param params
   * @returns
   */
  async addOperatorsToCompany(params: {
    companyId: string;
    operatorIds: string[];
  }): Promise<Prisma.BatchPayload> {
    return this.repository.addOperatorsToCompany(params);
  }

  /**
   *
   * @param params
   * @returns
   */
  async removeOperatorsFromCompany(params: {
    companyId: string;
    operatorIds: string[];
  }): Promise<Prisma.BatchPayload> {
    return this.repository.removeOperatorsFromCompany(params);
  }

  /**
   *
   * @param params
   * @returns
   */
  async setAccess(params: {
    operatorId: string;
    companyId: string;
    tapChangerIds: string[];
    roles: string[];
  }): Promise<Operator> {
    return this.repository.setAccess(params);
  }

  /**
   *
   * @param params
   */
  async registerAppInstance(params: {
    operatorId: string;
    companyId: string;
    takId: string;
  }): Promise<Operator> {
    return this.repository.registerAppInstance(params);
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
  }): Promise<Operator[]> {
    return this.repository.findMany(params);
  }
}
