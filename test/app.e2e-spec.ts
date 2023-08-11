import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 테스트에도 실제 어플리케이션 환경을 그대로 적용시켜줘야한다. 예를들어 transfrom 같은 설정들.
    // 안 그러면 백지 상태로 테스트가 진행되므로, 실제 앱과 테스트 환경에서의 타입이 다르게 출력될 수도 있다.
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API.');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2023,
          genres: ['action'],
        })
        .expect(201);
    });

    it('POST 404', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2023,
          genres: ['action'],
          other: 'thiing',
        })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Title' })
        .expect(200);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
