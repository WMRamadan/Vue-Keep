import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}
    @Post()
    addNote(@Body('text') noteText: string) {
        const generatedId = this.notesService.insertNote(noteText);
        return {id: generatedId};
    }

    @Get()
    getAllNotes() {
        return this.notesService.getNotes();
    }

    @Get(':id')
    getNote(@Param('id') noteId: string) {
        return this.notesService.getSingleNote(noteId);
    }

    @Patch(':id')
    updateNote(@Param('id') noteId: string, @Body('text') noteText: string) {
        this.notesService.updateNote(noteId, noteText);
        return null;
    }

    @Delete(':id')
    removeNote(@Param('id') noteId: string) {
        this.notesService.deleteNote(noteId);
        return null;
    }
}
