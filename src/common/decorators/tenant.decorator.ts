import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extract tenant id from request header
 */
export const TenantId = createParamDecorator<string, any, string>(
  (data: string, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const { headers } = request;

    return headers ? headers?.[data] : undefined;
  },
);
