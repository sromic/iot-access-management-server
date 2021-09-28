import { BadRequestException, Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';

import { isNonNullOrEmpty, isEmptyOrNull } from '../common/utils';

import { CompanyService } from '../company/company.service';

import { TapChangerService } from '../tap-changer/tap-changer.service';

import { OperatorService } from '../operator/operator.service';

import {
  CreateBulkOperatorDto,
  DeleteBulkOperatorDto,
  OperatorAccessDto,
  CreateBulkTapChangerDto,
  CreateCompanyDto,
  CreateTokenDurationCompanyDto,
  DeleteBulkTapChangerDto,
  RegisterAppInstanceOperatorDto,
} from './dtos';

@Injectable()
export class AdminService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly tapChangerService: TapChangerService,
    private readonly operatorService: OperatorService,
  ) {}

  /**
   *
   * @param createCompanyDto
   * @returns
   */
  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.companyService.create(createCompanyDto);
    return company;
  }

  /**
   *
   * @param createTokenDurationCompanyDto
   */
  async setCompanyTokenDuration(
    createTokenDurationCompanyDto: CreateTokenDurationCompanyDto,
  ): Promise<void> {
    const { companyId, duration } = createTokenDurationCompanyDto;

    await this.companyService.setTokenDuration({
      id: companyId,
      duration,
    });
  }

  /**
   *
   * @param createBulkTapChangerDto
   */
  async addTapChangersBulk(
    createBulkTapChangerDto: CreateBulkTapChangerDto,
  ): Promise<void> {
    const { tapChangerIds } = createBulkTapChangerDto;
    const input = {
      ids: tapChangerIds,
    };
    const existingTapChangers = await this.tapChangerService.findMany(input);

    if (existingTapChangers.length) {
      const existingTapChangersIdsStr = existingTapChangers
        .map((t) => t.id)
        .join(',');
      throw new BadRequestException(
        `Provided tap changer ids already exist: ${existingTapChangersIdsStr}`,
      );
    }

    await this.tapChangerService.addTapChangersToCompany(
      createBulkTapChangerDto,
    );
  }

  /**
   *
   * @param deleteBulkTapChangerDto
   */
  async removeTapChangersBulk(
    deleteBulkTapChangerDto: DeleteBulkTapChangerDto,
  ): Promise<void> {
    const { tapChangerIds, companyId } = deleteBulkTapChangerDto;

    const input = {
      ids: tapChangerIds,
      companyId,
    };
    const existingTapChangers = await this.tapChangerService.findMany(input);

    if (existingTapChangers.length < tapChangerIds.length) {
      const missingTapChangerIdsStr = tapChangerIds
        .filter((tapChangerId) =>
          isEmptyOrNull(
            existingTapChangers.find(
              (existingTapChanger) => existingTapChanger.id === tapChangerId,
            ),
          ),
        )
        .join(',');

      throw new BadRequestException(
        `Provided tap changers do not exist in the system or not assigned to the provided company: ${missingTapChangerIdsStr}`,
      );
    }

    await this.tapChangerService.removeTapChangersFromCompany(
      deleteBulkTapChangerDto,
    );
  }

  /**
   *
   * @param createBulkOperatorDto
   */
  async addOperatorsBulk(
    createBulkOperatorDto: CreateBulkOperatorDto,
  ): Promise<void> {
    const { operatorIds } = createBulkOperatorDto;

    const input = {
      ids: operatorIds,
    };
    const existingOperators = await this.operatorService.findMany(input);

    if (existingOperators.length) {
      const existingOpeatorsIdsStr = existingOperators
        .map((t) => t.id)
        .join(',');

      throw new BadRequestException(
        `Provided operators are already exist: ${existingOpeatorsIdsStr}`,
      );
    }

    await this.operatorService.addOperatorsToCompany(createBulkOperatorDto);
  }

  /**
   *
   * @param deleteBulkOperatorDto
   */
  async removeOperatorsBulk(
    deleteBulkOperatorDto: DeleteBulkOperatorDto,
  ): Promise<void> {
    const { companyId, operatorIds } = deleteBulkOperatorDto;

    const input = {
      ids: operatorIds,
      companyId,
    };
    const existingOperators = await this.operatorService.findMany(input);

    if (existingOperators.length < operatorIds.length) {
      const missingOperatorsIdsStr = operatorIds
        .filter((operatorId) =>
          isEmptyOrNull(
            existingOperators.find(
              (existingOperator) => existingOperator.id === operatorId,
            ),
          ),
        )
        .join(',');

      throw new BadRequestException(
        `Provided operators do not exist in the system or not assigned to the provided company: ${missingOperatorsIdsStr}`,
      );
    }

    await this.operatorService.removeOperatorsFromCompany(
      deleteBulkOperatorDto,
    );
  }

  /**
   *
   * @param operatorAccessDto
   */
  async addAccessToTapChangers(
    operatorAccessDto: OperatorAccessDto,
  ): Promise<void> {
    const { operatorId, companyId, tapChangerIds } = operatorAccessDto;

    const operatorServiceParams = {
      id: operatorId,
      companyId,
    };
    const operatorBelongsToCompany =
      await this.operatorService.belongsToCompany(operatorServiceParams);

    if (!operatorBelongsToCompany) {
      throw new BadRequestException(
        `Provided operator doesn't works for provided company`,
      );
    }

    const tapChangerServiceParams = {
      ids: tapChangerIds,
      companyId,
    };
    const existingCompanyTapChangers = await this.tapChangerService.findMany(
      tapChangerServiceParams,
    );

    if (existingCompanyTapChangers.length < tapChangerIds.length) {
      const missingTapChangerIdsStr = tapChangerIds
        .filter((tapChangerId) =>
          isNonNullOrEmpty(
            existingCompanyTapChangers.find(
              (existingTapChanger) => existingTapChanger.id === tapChangerId,
            ),
          ),
        )
        .join(',');

      throw new BadRequestException(
        `Provided tap changers do not exist in the system or not assigned to the provided company: ${missingTapChangerIdsStr}`,
      );
    }

    await this.operatorService.setAccess(operatorAccessDto);
  }

  /**
   *
   * @param registerAppInstanceDto
   */
  async registerAppInstanceToOperator(
    registerAppInstanceDto: RegisterAppInstanceOperatorDto,
  ): Promise<void> {
    const { operatorId, companyId } = registerAppInstanceDto;

    const params = {
      id: operatorId,
      companyId,
    };
    const operatorBelongsToCompany =
      await this.operatorService.belongsToCompany(params);

    if (!operatorBelongsToCompany) {
      throw new BadRequestException(
        `Provided operator isn't registered with provided company or it doesn't exist`,
      );
    }

    await this.operatorService.registerAppInstance(registerAppInstanceDto);
  }
}
