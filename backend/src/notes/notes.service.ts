import { Injectable, NotFoundException } from "@nestjs/common";
import { Note } from './note.model';

@Injectable()
export class NotesService {
    private notes: Note[] = [];

    insertNote(text: string) {
        const noteId = Math.random().toString();
        const newNote = new Note(noteId, text);
        this.notes.push(newNote);
        return noteId;
    }

    getNotes() {
        return [...this.notes];
    }

    getSingleNote(noteId: string) {
        const note = this.findNote(noteId)[0];
        return {...note};
    }

    updateNote(noteId: string, text: string){
        const [note, index] = this.findNote(noteId);
        const updatedNote = {...note};
        if (text) {
            updatedNote.text = text;
        }
        this.notes[index] = updatedNote;
    }

    deleteNote(noteId: string) {
        const index = this.findNote(noteId)[1];
        this.notes.splice(index, 1);
    }

    private findNote(id: string): [Note, number] {
        const noteIndex = this.notes.findIndex((note) => note.id === id);
        const note = this.notes[noteIndex];
        if (!note) {
            throw new NotFoundException('Could not find note.');
        }
        return [note, noteIndex];
    }
}