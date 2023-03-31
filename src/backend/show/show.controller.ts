import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ShowService } from './show.service';

@Controller('show')
export class ShowController {
  constructor(private service: ShowService) {}
  @Get()
  async fetchOne() {
    return this.service.fetchOne();
  }

  @Post(':showId/buy_item/:itemId')
  @HttpCode(204)
  async sell(@Param('showId') showId: number, @Param('itemId') itemId: number) {
    await this.service.sellItem(+showId, +itemId);
    return;
  }
}
