import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '../common/services';

import { AppInstanceService } from '../app-instance/app-instance.service';
import { OperatorService } from '../operator/operator.service';

import { ISSUER, TOKEN_DURATION_IN_H } from './utils/constant';
import { AccessTokenTapChangerDto } from './dtos/access-token.tap-changer.dto';

@Injectable()
export class AccessTokenService {
  constructor(
    private readonly appInstanceService: AppInstanceService,
    private readonly jwtService: JwtService,
    private readonly operatorService: OperatorService,
  ) {}

  /**
   *
   * @param takId
   */
  async getTapChangersAccessTokens(
    takId: string,
  ): Promise<AccessTokenTapChangerDto[]> {
    const appInstance = await this.appInstanceService.getById(takId);

    if (!appInstance) {
      throw new BadRequestException(
        `Provided T.A.K ID doesn't exist in the system`,
      );
    }

    const { operatorId } = appInstance;
    const operator = await this.operatorService.getCompleteById(operatorId);

    if (!operator) {
      throw new BadRequestException(
        `Provided T.A.K ID not assigned to valid operator or company`,
      );
    }

    const data = {
      user: operatorId,
      tak: takId,
      roles: operator.roles,
    };

    const tapChangerAccessTokensPromises = operator.tapChargers.map(
      async (tapChanger) => {
        const options = {
          audience: tapChanger.tapChangerId,
          expiresInH:
            operator?.company?.tokenDuration?.duration || TOKEN_DURATION_IN_H,
          issuer: ISSUER,
          subject: operatorId,
        };
        const params = { data, options };
        const jwtToken = await this.jwtService.sign(params);

        const accessTokenDto = new AccessTokenTapChangerDto();
        accessTokenDto.jwtToken = jwtToken;
        accessTokenDto.tapChangerId = tapChanger.tapChangerId;
        return accessTokenDto;
      },
    );

    const tapChangerAccessTokens = await Promise.all(
      tapChangerAccessTokensPromises,
    );

    return tapChangerAccessTokens;
  }
}
