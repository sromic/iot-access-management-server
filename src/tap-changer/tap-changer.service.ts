import { Injectable } from '@nestjs/common';
import { Prisma, TapChanger } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractService, PrismaService } from '../common/services';

@Injectable()
export class TapChangerService extends AbstractService<string, TapChanger> {
  constructor(protected readonly prismaService: PrismaService) {
    super();
  }

  /**
   *
   * @param id
   * @returns
   */
  async getById(id: string): Promise<Maybe<TapChanger>> {
    return this.prismaService.tapChanger.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: false,
    });
  }

  /**
   *
   * @param input
   * @returns
   */
  async create(input: Prisma.TapChangerCreateInput): Promise<TapChanger> {
    const tagChanger = await this.prismaService.tapChanger.create({
      data: input,
    });
    return tagChanger;
  }

  /**
   *
   * @param params
   * @returns
   */
  async addOperator(params: {
    tapChangerId: string;
    operatorId: string;
  }): Promise<TapChanger> {
    const { tapChangerId, operatorId } = params;
    const tapChangerWithOperator = await this.prismaService.tapChanger.update({
      where: {
        id: tapChangerId,
      },
      data: {
        operators: {
          connectOrCreate: {
            where: {
              operatorId_tapChangerId: {
                operatorId,
                tapChangerId,
              },
            },
            create: {
              operatorId,
            },
          },
        },
        updatedAt: new Date(),
      },
      include: {
        operators: { include: { operator: true } },
      },
    });
    return tapChangerWithOperator;
  }

  /**
   *
   * @param params
   * @returns
   */
  async update(params: {
    id: string;
    input: Prisma.TapChangerUpdateInput;
  }): Promise<TapChanger> {
    const { id, input } = params;

    const tapChanger = await this.prismaService.tapChanger.update({
      where: { id },
      data: input,
    });
    return tapChanger;
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<TapChanger> {
    const deletedTapChanger = await this.prismaService.tapChanger.delete({
      where: {
        id,
      },
    });
    return deletedTapChanger;
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
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.tapChanger.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
