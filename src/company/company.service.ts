import { BadRequestException, Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractService } from '../common/services';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService extends AbstractService<string, Company> {
  constructor(protected readonly repository: CompanyRepository) {
    super(repository);
  }

  /**
   *
   * @param id
   * @returns
   */
  async getById(id: string): Promise<Maybe<Company>> {
    return this.repository.getById(id);
  }

  /**
   *
   * @returns
   */
  async create(input: Prisma.CompanyCreateInput): Promise<Company> {
    const { name } = input;
    const nameExists = await this.repository.nameExists(name);

    if (nameExists) {
      throw new BadRequestException('Provided company name already exists');
    }

    const company = await this.repository.create(input);
    return company;
  }

  /**
   *
   * @param id
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
    input: Prisma.CompanyUpdateInput;
  }): Promise<Company> {
    const company = await this.repository.update(params);
    return company;
  }

  /**
   *
   * @param params
   * @returns
   */
  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput;
  }): Promise<Company[]> {
    return this.repository.list(params);
  }

  /**
   *
   * @param params
   * @returns
   */
  async setTokenDuration(params: {
    id: string;
    duration: number;
  }): Promise<Company> {
    return this.repository.setTokenDuration(params);
  }
}
