import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryService } from './inventory/inventory.service';
import { ShowService } from './show/show.service';
import { ShowController } from './show/show.controller';

@Module({
  providers: [PrismaService, InventoryService, ShowService],
  imports: [],
  controllers: [InventoryController, ShowController],
})
export class BackendModule {}
