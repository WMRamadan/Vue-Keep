import * as mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema({
    text: { type: String, required: true},
});
export interface Note extends mongoose.Document {
    id: string;
    text: string;
}