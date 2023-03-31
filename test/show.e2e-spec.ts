import { Test } from '@nestjs/testing';
import { ConflictException, INestApplication } from '@nestjs/common';
import { ShowController } from 'src/backend/show/show.controller';
import { ShowService } from 'src/backend/show/show.service';
describe('ShowController', () => {
  let app: INestApplication;
  let controller: ShowController;
  let service: ShowService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ShowController],
      providers: [
        {
          provide: ShowService,
          useValue: {
            fetchOne: jest.fn(),
            sellItem: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    controller = moduleRef.get<ShowController>(ShowController);
    service = moduleRef.get<ShowService>(ShowService);

    await app.init();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /show', () => {
    it('should return a show', async () => {
      const mockShow = { id: 1, name: 'Test Show', sales: [] };
      jest.spyOn(service, 'fetchOne').mockResolvedValueOnce(mockShow as any);

      const response = await controller.fetchOne();

      expect(response).toEqual(mockShow);
      expect(service.fetchOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /show/:showId/buy_item/:itemId', () => {
    it('should sell an item', async () => {
      const mockSale = { id: 1, item: { id: 1, name: 'Test Item' } };
      jest.spyOn(service, 'sellItem').mockResolvedValueOnce(mockSale as any);

      const response = await controller.sell(1, 1);

      expect(response).toEqual(undefined);
      expect(service.sellItem).toHaveBeenCalledTimes(1);
      expect(service.sellItem).toHaveBeenCalledWith(1, 1);
    });

    it('should throw an error if item is not available', async () => {
      const mockItem = {
        itemID: 1,
        itemName: 'Test Item',
        quantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(service, 'sellItem')
        .mockRejectedValueOnce(
          new ConflictException('This item is not available'),
        );
      jest.spyOn(service, 'fetchOne').mockResolvedValueOnce({
        id: 1,
        name: 'Test Show',
        sales: [{ item: mockItem }],
      } as any);

      try {
        await controller.sell(1, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toEqual('This item is not available');
        expect(service.sellItem).toHaveBeenCalledTimes(1);
        expect(service.sellItem).toHaveBeenCalledWith(1, 1);
      }
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
