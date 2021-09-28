import { Injectable } from '@nestjs/common';

import { Prisma, TapChanger } from '@prisma/client';

import { Maybe } from '../common/types';
import { AbstractRepository, PrismaRepository } from '../common/repositories';
import { isNotNullOrUndefined } from '../common/utils';

@Injectable()
export class TapChangerRepository extends AbstractRepository<
  string,
  TapChanger
> {
  constructor(protected readonly prismaRepository: PrismaRepository) {
    super(prismaRepository);
  }

  /**
   *
   * @param id
   * @returns
   */
  async getById(id: string): Promise<Maybe<TapChanger>> {
    return this.prismaRepository.tapChanger.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   *
   * @param input
   * @returns
   */
  async create(input: Prisma.TapChangerCreateInput): Promise<TapChanger> {
    const tagChanger = await this.prismaRepository.tapChanger.create({
      data: input,
    });
    return tagChanger;
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
    const { id, input } = params;

    const tapChanger = await this.prismaRepository.tapChanger.update({
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
    const deletedTapChanger = await this.prismaRepository.tapChanger.delete({
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
    return this.prismaRepository.tapChanger.findMany({
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
  async addTapChangersToCompany(params: {
    companyId: string;
    tapChangerIds: string[];
  }): Promise<Prisma.BatchPayload> {
    const { companyId, tapChangerIds } = params;
    const createTapChangersQuery = tapChangerIds.map((tapChangerId) => {
      return {
        id: tapChangerId,
        companyId,
      };
    });

    return this.prismaRepository.tapChanger.createMany({
      data: createTapChangersQuery,
    });
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
    const { companyId, tapChangerIds } = params;

    return this.prismaRepository.tapChanger.deleteMany({
      where: {
        AND: {
          id: {
            in: tapChangerIds,
          },
          companyId,
        },
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

    const operator = await this.prismaRepository.tapChanger.findUnique({
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
  }): Promise<TapChanger[]> {
    const { ids, companyId } = params;

    const args: Prisma.TapChangerFindManyArgs = {
      where: {
        id: { in: ids },
      },
    };

    if (companyId) {
      args.where.companyId = companyId;
    }

    const tapChangers = await this.prismaRepository.tapChanger.findMany(args);
    return tapChangers;
  }
}
