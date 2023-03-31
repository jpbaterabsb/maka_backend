import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async upsert(item: Item) {
    const { itemID, ...rest } = item;
    let response;

    if (!itemID) {
      response = await this.prismaService.item.create({
        data: { ...rest },
      });
    } else {
      response = await this.prismaService.item.update({
        where: {
          itemID,
        },
        data: {
          ...rest,
        },
      });
    }
    return response;
  }

  async fetchAll() {
    return this.prismaService.item.findMany({
      orderBy: {
        itemName: 'asc',
      },
    });
  }
}
