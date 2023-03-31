import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShowService {
  constructor(private readonly prismaService: PrismaService) {}
  async fetchOne() {
    const show = await this.prismaService.show.findFirst({
      include: {
        sales: {
          include: {
            item: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return show;
  }

  async sellItem(showId: number, itemId: number) {
    return this.prismaService.$transaction(async (tx) => {
      const item = await tx.item.findUnique({
        where: {
          itemID: itemId,
        },
      });

      if (item.quantity === 0) {
        throw new ConflictException('This item is not available');
      }

      await tx.item.update({
        where: {
          itemID: itemId,
        },
        data: {
          quantity: item.quantity - 1,
        },
      });

      const sale = await tx.sale.create({
        data: {
          itemId,
          showId,
        },
        include: {
          item: true,
        },
      });

      return sale;
    });
  }
}
