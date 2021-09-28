import { Injectable } from '@nestjs/common';

import { sign } from 'jsonwebtoken';

import { nanoid } from 'nanoid';

const { JWT_SECRET } = process.env;

@Injectable()
export class JwtService {
  async sign<T extends Record<string, unknown>>(params: {
    data: T;
    options: {
      audience: string;
      expiresInH: number;
      issuer: string;
      subject: string;
    };
  }): Promise<string> {
    const { data, options } = params;
    const { audience, expiresInH, issuer, subject } = options;

    const jwtToken = sign(data, JWT_SECRET, {
      expiresIn: `${expiresInH}h`,
      issuer,
      subject,
      audience,
      jwtid: nanoid(),
      notBefore: 0,
    });
    return jwtToken;
  }
}
