<template>
  <div>
    <div>
        <input type="textarea" class="notes-input" placeholder="Write a note." v-model="newNote" @keyup.enter="addNote">
        <button class="btn" @click="addNote">
            Save
        </button>
    </div>
    <div v-for="(note, index) in notes" :key="note.id" class="note-item">
        <div>
            {{ note.text }}
        </div>
        <div class="remove-item" @click="removeNote(index, note)">
            &times;
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Notes',
  data () {
    return {
      notes: [],
      newNote: ''
    }
  },
  async created(){
      try {
          const res = await axios.get('http://127.0.0.1:3000/notes');
          this.notes = res.data;
      } catch (e) {
          console.error(e);
      }
  },
  methods: {
    async addNote() {
          if(this.newNote.trim().length == 0) {
              return
          }
          const res = await axios.post('http://127.0.0.1:3000/notes', {text: this.newNote});
          this.notes.push({
              id: this.newNote,
              text: this.newNote,
              checked: false,
          })
          this.newNote = '';
      },
      removeNote(index, note) {
          const res = axios.delete('http://127.0.0.1:3000/notes/' + note.id);
          this.notes.splice(index, 1);
      }
  }
}
</script>


<style>
    .btn {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }

    .notes-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }

    .note-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;
    }
</style>
