import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { InventoryController } from 'src/backend/inventory/inventory.controller';
import { InventoryService } from 'src/backend/inventory/inventory.service';

describe('InventoryController (e2e)', () => {
  let app: INestApplication;
  const inventoryService = {
    fetchAll: jest.fn().mockResolvedValue([{ id: 1, itemName: 'item1' }]),
    upsert: jest.fn(),
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [{ provide: InventoryService, useValue: inventoryService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/inventory (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/inventory')
      .expect(200);

    expect(response.body).toEqual([{ id: 1, itemName: 'item1' }]);
    expect(inventoryService.fetchAll).toHaveBeenCalled();
  });

  it('/inventory (POST)', async () => {
    const newItem = { itemName: 'item1' };
    await request(app.getHttpServer())
      .post('/inventory')
      .send(newItem)
      .expect(201);

    expect(inventoryService.upsert).toHaveBeenCalledWith(newItem);
  });

  afterAll(async () => {
    await app.close();
  });
});
