import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateTaskDto } from '../src/tasks/dto/create-task.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer()).get('/tasks').expect(200);
  });

  it('/tasks (POST)', () => {
    return request(app.getHttpServer()).post('/tasks').expect(201);
  });

  it('/tasks/:id (GET)', async () => {
    const task: CreateTaskDto = {
      title: 'any_task',
      description: 'any_description',
    };
    const { body } = await request(app.getHttpServer())
      .post('/tasks')
      .send(task);

    const { body: res } = await request(app.getHttpServer()).get(
      `/tasks/${body.id}`,
    );
    expect(res.description).toBe(task.description);
    expect(res.title).toBe(task.title);
  });
});
