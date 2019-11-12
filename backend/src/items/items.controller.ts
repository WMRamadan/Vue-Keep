import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}
    @Post()
    async addItem(@Body('text') itemText: string) {
        const generatedId = await this.itemsService.insertItem(itemText);
        return {id: generatedId};
    }

    @Get()
    async getAllItems() {
        const items = await this.itemsService.getItems();
        return items;
    }

    @Get(':id')
    getItem(@Param('id') itemId: string) {
        return this.itemsService.getSingleItem(itemId);
    }

    @Patch(':id')
    async updateItem(@Param('id') itemId: string, @Body('text') itemText: string, @Body('checked') itemChecked: boolean) {
        await this.itemsService.updateItem(itemId, itemText, itemChecked);
        return null;
    }

    @Delete(':id')
    async removeItem(@Param('id') itemId: string) {
        await this.itemsService.deleteItem(itemId);
        return null;
    }
}
