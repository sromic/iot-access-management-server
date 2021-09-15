import { Injectable } from '@nestjs/common';
import { Operator, Prisma } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractService, PrismaService } from '../common/services';

@Injectable()
export class OperatorService extends AbstractService<string, Operator> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  /**
   *
   * @param id
   * @returns
   */
  async getById(id: string): Promise<Maybe<Operator>> {
    return this.prismaService.operator.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: false,
    });
  }

  /**
   *
   * @returns
   */
  async create(input: Prisma.OperatorCreateInput): Promise<Operator> {
    const operator = await this.prismaService.operator.create({
      data: input,
    });
    return operator;
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<void> {
    await this.prismaService.operator.delete({
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

    const operator = await this.prismaService.operator.update({
      where: { id },
      data: input,
    });
    return operator;
  }

  /**
   *
   * @param params
   * @returns
   */
  async addTapChangersAccess(params: {
    id: string;
    tapChangerIds: string[];
  }): Promise<Operator> {
    const { id, tapChangerIds } = params;

    const connectOrCreateTapChangersQuery = tapChangerIds.map(
      (tapChangerId) => {
        return {
          where: {
            operatorId_tapChangerId: {
              operatorId: id,
              tapChangerId,
            },
          },
          create: {
            tapChangerId,
          },
        };
      },
    );
    const tapChangerWithOperator = await this.prismaService.operator.update({
      where: {
        id,
      },
      data: {
        tapChargers: {
          connectOrCreate: connectOrCreateTapChangersQuery,
        },
        updatedAt: new Date(),
      },
      include: {
        tapChargers: { include: { tapChanger: true } },
      },
    });
    return tapChangerWithOperator;
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
    return this.prismaService.operator.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
