import { Injectable } from '@nestjs/common';
import { Operator, Prisma } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractRepository, PrismaRepository } from '../common/repositories';
import { isNotNullOrUndefined } from '../common/utils';

import { CompleteOperator } from './types/operator.type';

@Injectable()
export class OperatorRepository extends AbstractRepository<string, Operator> {
  constructor(protected readonly prismaRepository: PrismaRepository) {
    super(prismaRepository);
  }

  /**
   *
   * @param id
   * @returns
   */
  async getById(id: string): Promise<Maybe<Operator>> {
    return this.prismaRepository.operator.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: false,
    });
  }

  /**
   *
   * @param id
   * @returns
   */
  async getCompleteById(id: string): Promise<CompleteOperator> {
    const completeOperator = this.prismaRepository.operator.findUnique({
      where: {
        id,
      },
      include: {
        appInstances: true,
        company: {
          include: {
            tokenDuration: true,
          },
        },
        tapChargers: true,
      },
      rejectOnNotFound: false,
    });

    return completeOperator;
  }

  /**
   *
   * @returns
   */
  async create(input: Prisma.OperatorCreateInput): Promise<Operator> {
    const operator = await this.prismaRepository.operator.create({
      data: input,
    });
    return operator;
  }

  /**
   *
   * @param params
   */
  async delete(id: string): Promise<void> {
    await this.prismaRepository.operator.delete({
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
    input: Prisma.OperatorUpdateInput;
  }): Promise<Operator> {
    const { id, input } = params;

    const operator = await this.prismaRepository.operator.update({
      where: {
        id,
      },
      data: input,
    });
    return operator;
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
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaRepository.operator.findMany({
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
  async addOperatorsToCompany(params: {
    companyId: string;
    operatorIds: string[];
  }): Promise<Prisma.BatchPayload> {
    const { companyId, operatorIds } = params;

    const createOperatorsQuery = operatorIds.map((operatorId) => {
      return {
        id: operatorId,
        companyId,
      };
    });
    return this.prismaRepository.operator.createMany({
      data: createOperatorsQuery,
    });
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
    const { companyId, operatorIds } = params;

    return this.prismaRepository.operator.deleteMany({
      where: {
        id: { in: operatorIds },
        companyId,
      },
    });
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
    const { operatorId, companyId, tapChangerIds, roles } = params;

    const connectTapChangersQuery = tapChangerIds.map((tapChangerId) => {
      return {
        where: {
          operatorId_tapChangerId_companyId: {
            operatorId,
            tapChangerId,
            companyId,
          },
        },
        create: {
          tapChangerId,
          companyId,
        },
      };
    });

    const operator = await this.prismaRepository.operator.update({
      where: {
        id_companyId: {
          id: operatorId,
          companyId,
        },
      },
      data: {
        tapChargers: {
          deleteMany: {},
          connectOrCreate: connectTapChangersQuery,
        },
        roles,
        updatedAt: new Date(),
      },
    });
    return operator;
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
    const { operatorId, companyId, takId } = params;

    return this.prismaRepository.operator.update({
      where: {
        id_companyId: {
          id: operatorId,
          companyId,
        },
      },
      data: {
        appInstances: {
          connectOrCreate: {
            where: {
              takId,
            },
            create: {
              takId,
              companyId,
            },
          },
        },
      },
      include: {
        appInstances: true,
      },
    });
  }

  /**
   *
   * @param params
   */
  async belongsToCompany(params: {
    id: string;
    companyId: string;
  }): Promise<boolean> {
    const { id, companyId } = params;

    const operator = await this.prismaRepository.operator.findUnique({
      where: {
        id_companyId: {
          id,
          companyId,
        },
      },
    });

    return isNotNullOrUndefined(operator);
  }

  /**
   *
   * @param ids
   */
  async findMany(params: {
    ids: string[];
    companyId?: string;
  }): Promise<Operator[]> {
    const { ids, companyId } = params;

    const args: Prisma.OperatorFindManyArgs = {
      where: {
        id: { in: ids },
      },
    };

    if (companyId) {
      args.where.companyId = companyId;
    }

    const operators = await this.prismaRepository.operator.findMany(args);
    return operators;
  }
}
