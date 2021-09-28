import { Injectable } from '@nestjs/common';

import { AppInstance } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractRepository, PrismaRepository } from '../common/repositories';

@Injectable()
export class AppInstanceRepository extends AbstractRepository<
  string,
  AppInstance
> {
  constructor(protected readonly prismaRepository: PrismaRepository) {
    super(prismaRepository);
  }

  /**
   *
   * @param takId
   */
  async getById(takId: string): Promise<Maybe<AppInstance>> {
    return this.prismaRepository.appInstance.findUnique({
      where: { takId },
      rejectOnNotFound: false,
    });
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
    const { takId, companyId, operatorId } = params;

    return this.prismaRepository.appInstance.create({
      data: {
        takId,
        company: {
          connect: {
            id: companyId,
          },
        },
        operator: {
          connect: {
            id_companyId: { id: operatorId, companyId },
          },
        },
      },
    });
  }
}
