import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.model';

@Injectable()
export class ItemsService {

    constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

    async insertItem(text: string) {
        const newItem = new this.itemModel({text: text});
        const result = await newItem.save();
        console.log(result);
        return result.id as string;
    }

    async getItems() {
        const items = await this.itemModel.find().exec();
        console.log(items);
        return items.map(item => ({id: item.id, text: item.text, checked: item.checked}));
    }

    async getSingleItem(itemId: string) {
        const item = await this.findItem(itemId);
        return {id: item.id, text: item.text, checked: item.checked};
    }

    async updateItem(itemId: string, text: string, checked: boolean){
        const updatedItem = await this.findItem(itemId);
    
            updatedItem.checked = checked;

        updatedItem.save();
    }

    async deleteItem(itemId: string) {
        const result = await this.itemModel.deleteOne({_id: itemId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find item.');
        }
    }

    private async findItem(id: string): Promise<Item> {
        let item;
        try {
        item = await this.itemModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find item.');
        }
        if (!item) {
            throw new NotFoundException('Could not find item.');
        }
        return item;
    }
}