import { Item } from '@prisma/client';

export type ItemDTO = Partial<Item> & {
  itemID?: number;
};
