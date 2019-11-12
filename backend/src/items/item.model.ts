import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
    text: { type: String, required: true},
    checked: { type: Boolean },
});
export interface Item extends mongoose.Document {
    id: string;
    text: string;
    checked: boolean;
}