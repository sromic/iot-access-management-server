import { Controller, Get, Param } from '@nestjs/common';

import { AccessTokenService } from './access-token.service';
import { AccessTokenTapChangerDto } from './dtos';

@Controller('accessTokens')
export class AccessTokenController {
  constructor(private readonly accessTokenService: AccessTokenService) {}

  @Get('taks/:id/tapChangers')
  async getTapChangersAccessTokens(
    @Param('id') takId: string,
  ): Promise<AccessTokenTapChangerDto[]> {
    const tapChangersAccessTokens =
      await this.accessTokenService.getTapChangersAccessTokens(takId);
    return tapChangersAccessTokens;
  }
}
