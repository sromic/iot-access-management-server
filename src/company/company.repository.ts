import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractRepository, PrismaRepository } from '../common/repositories';
import { isNonNullOrEmpty } from '../common/utils';

@Injectable()
export class CompanyRepository extends AbstractRepository<string, Company> {
  constructor(protected readonly prismaRepository: PrismaRepository) {
    super(prismaRepository);
  }

  /**
   *
   * @param id
   * @returns
   */
  async getById(id: string): Promise<Maybe<Company>> {
    return this.prismaRepository.company.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: false,
    });
  }

  /**
   *
   * @param name
   * @returns
   */
  async nameExists(name: string): Promise<boolean> {
    const company = await this.prismaRepository.company.findUnique({
      where: { name },
      rejectOnNotFound: false,
    });

    return isNonNullOrEmpty(company);
  }

  /**
   *
   * @returns
   */
  async create(input: Prisma.CompanyCreateInput): Promise<Company> {
    const company = await this.prismaRepository.company.create({
      data: input,
    });
    return company;
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<void> {
    await this.prismaRepository.company.delete({
      where: {
        id,
      },
    });
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
    const { id, input } = params;

    const company = await this.prismaRepository.company.update({
      where: { id },
      data: input,
    });
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
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaRepository.company.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
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
    const { id, duration } = params;

    return this.prismaRepository.company.update({
      where: {
        id,
      },
      data: {
        tokenDuration: {
          upsert: {
            update: {
              duration,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            create: {
              duration,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        updatedAt: new Date(),
      },
    });
  }
}
