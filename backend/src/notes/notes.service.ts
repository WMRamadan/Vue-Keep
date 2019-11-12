import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.model';

@Injectable()
export class NotesService {

    constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

    async insertNote(text: string) {
        const newNote = new this.noteModel({text: text});
        const result = await newNote.save();
        console.log(result);
        return result.id as string;
    }

    async getNotes() {
        const notes = await this.noteModel.find().exec();
        console.log(notes);
        return notes.map(note => ({id: note.id, text: note.text}));
    }

    async getSingleNote(noteId: string) {
        const note = await this.findNote(noteId);
        return {id: note.id, text: note.text};
    }

    async updateNote(noteId: string, text: string){
        const updatedNote = await this.findNote(noteId);
        if (text) {
            updatedNote.text = text;
        }
        updatedNote.save();
    }

    async deleteNote(noteId: string) {
        const result = await this.noteModel.deleteOne({_id: noteId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find note.');
        }
    }

    private async findNote(id: string): Promise<Note> {
        let note;
        try {
        note = await this.noteModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find note.');
        }
        if (!note) {
            throw new NotFoundException('Could not find note.');
        }
        return note;
    }
}