import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [NotesModule, MongooseModule.forRoot('mongodb://localhost:27017/VueKeep')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
