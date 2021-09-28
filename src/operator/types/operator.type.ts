import {
  AppInstance,
  Company,
  Operator,
  TapChangerOperator,
  TokenDuration,
} from '@prisma/client';

export type CompleteOperator = Operator & {
  tapChargers: TapChangerOperator[];
  appInstances: AppInstance[];
  company: Company & { tokenDuration: TokenDuration };
};
