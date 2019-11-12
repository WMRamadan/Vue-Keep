import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}
    @Post()
    async addNote(@Body('text') noteText: string) {
        const generatedId = await this.notesService.insertNote(noteText);
        return {id: generatedId};
    }

    @Get()
    async getAllNotes() {
        const notes = await this.notesService.getNotes();
        return notes;
    }

    @Get(':id')
    getNote(@Param('id') noteId: string) {
        return this.notesService.getSingleNote(noteId);
    }

    @Patch(':id')
    async updateNote(@Param('id') noteId: string, @Body('text') noteText: string) {
        await this.notesService.updateNote(noteId, noteText);
        return null;
    }

    @Delete(':id')
    async removeNote(@Param('id') noteId: string) {
        await this.notesService.deleteNote(noteId);
        return null;
    }
}
