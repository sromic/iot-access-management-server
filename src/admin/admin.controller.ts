import { Company } from '.prisma/client';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CompanyIdValidationInterceptor } from './interceptors';

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
import { AdminService } from './admin.service';

@UseInterceptors(CompanyIdValidationInterceptor)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/companies')
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    const company = await this.adminService.createCompany(createCompanyDto);
    return company;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/companies/tokenDuration')
  async setCompanyTokenDuration(
    @Body() createTokenDurationCompanyDto: CreateTokenDurationCompanyDto,
  ): Promise<void> {
    await this.adminService.setCompanyTokenDuration(
      createTokenDurationCompanyDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/tapChangers/registerBulk')
  async addTapChangersBulk(
    @Body()
    createBulkTapChangerDto: CreateBulkTapChangerDto,
  ): Promise<void> {
    await this.adminService.addTapChangersBulk(createBulkTapChangerDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/tapChangers/removeBulk')
  async removeTapChangersBulk(
    @Body()
    deleteBulkTapChangerDto: DeleteBulkTapChangerDto,
  ): Promise<void> {
    await this.adminService.removeTapChangersBulk(deleteBulkTapChangerDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('operators/registerBulk')
  async addOperatorsBulk(
    @Body()
    createBulkOperatorDto: CreateBulkOperatorDto,
  ): Promise<void> {
    await this.adminService.addOperatorsBulk(createBulkOperatorDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('operators/removeBulk')
  async removeOperatorsBulk(
    @Body()
    deleteBulkOperatorDto: DeleteBulkOperatorDto,
  ): Promise<void> {
    await this.adminService.removeOperatorsBulk(deleteBulkOperatorDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/operators/access')
  async addAccessToTapChangers(
    @Body()
    operatorAccessDto: OperatorAccessDto,
  ): Promise<void> {
    await this.adminService.addAccessToTapChangers(operatorAccessDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/operators/appInstance')
  async registerAppInstanceToOperator(
    @Body()
    registerAppInstanceDto: RegisterAppInstanceOperatorDto,
  ): Promise<void> {
    await this.adminService.registerAppInstanceToOperator(
      registerAppInstanceDto,
    );
  }
}
