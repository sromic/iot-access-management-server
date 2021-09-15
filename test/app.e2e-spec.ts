import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const response = request(app.getHttpServer()).get('/');
    response.expect(200).expect(`<h1>Static website</h1>
    <p>
      <b>Hello world</b>
    </p>`);
  });

  afterAll(async () => {
    await app.close();
  });
});
