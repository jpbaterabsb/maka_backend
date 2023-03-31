import { Body, Controller, Get, Post } from '@nestjs/common';
import { Item } from '@prisma/client';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private service: InventoryService) {}
  @Get()
  async fetchAll() {
    return this.service.fetchAll();
  }

  @Post()
  async upsert(@Body() item: Item) {
    await this.service.upsert(item as Item);
  }
}
